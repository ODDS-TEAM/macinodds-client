import { MyCardComponent } from './../my-card/my-card.component';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MyDataServiceService } from '../../my-data-service.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DeviceApiService } from 'src/app/service/device-api.service';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {

  @ViewChild('yourChild',{static: false}) child;

  @Input() role: boolean;
  btnRole: boolean;
  showMyCard: boolean = false;

  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  public editResults: any; // กำหนดตัวแปร เพื่อรับค่า
  name: string;
  serial: string;
  spec: string;
  image = '';
  status = true;
  holder: string;
  borrowForm: FormGroup;
  dateNow = new Date();
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 3));
  returnDate: any;
  localtime: any;
  userId = localStorage.getItem('userId');
  @Input() cantBorrow = false;
  idDeviceBorrow: any;
  btnValid = false;
  myDevice: any;
  btnBorrow: boolean = false;




  objectToMyCard: any = {
    name: '',
    serial: '',
    spec: '',
    returnDate: '',
    img: ''
  };
  hiddenMyCard = false;

  constructor(
    private data: MyDataServiceService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private macApiService: DeviceApiService,
    private formBuilder: FormBuilder,
    private http: HttpClient) {
    this.setHiddenMyCard();
  }

  ngOnInit() {
    this.editResults = {};
    this.myDevice = {};
    this.getDevice();
    this.getMyDevice();
    this.data.currentData.subscribe(data => this.name = data);
    this.createBorrowForm();
    this.btnRole = (localStorage.getItem('role') === 'individual');
  }

  getMyDevice() {
    this.macApiService.getMyDevice().subscribe(res => {
      this.myDevice = res[0];
      if (this.myDevice.borrowing)
        this.btnBorrow = true;
      else
        this.btnBorrow = false;
    })
  }

  getDevice() {

    this.macApiService.getMacApi().subscribe(data => {
      this.results = data;

    });
  }

  // get device id for show data
  getDeviceByID(id) {
    console.log('print id : ' + id);
    this.macApiService.getMacIDApi(id).subscribe(data => {
      // read result form JSON response
      this.editResults = data;
      console.log(this.editResults);
    });
  }

  // delete device when click button by id device
  deleteDevice(id, serial) {
    console.log('confirem delete : ' + id);
    if (window.confirm('Are you sure, you want to delete device serial number: ' + serial)) {
      this.macApiService.deleteMacAPI(id).subscribe(data => {
        this.getDevice();
      });
    }
  }

  // method for when click edit button
  editDevice(id) {
    this.data.changeData(id);
    this.router.navigate(['/admin/edit']);
  }

  createBorrowForm() {
    this.borrowForm = this.formBuilder.group({
      borrow: ['', Validators.required]
      // borrow: new FormControl('', Validators.required)
    });
  }

  borrowDevice(id) {
    console.log('click borrow');
    this.idDeviceBorrow = '' + id;
    console.log('borrow Device id =====> ' + this.idDeviceBorrow);
  }

  onSubmitBorrow() {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.localtime = (new Date(this.returnDate - tzoffset));
    this.localtime.setHours(12, 0, 0);
    const localISOTime = (new Date(this.localtime)).toISOString();
    // post method
    const data = {
      "returnDate": localISOTime
    }
    this.macApiService.postBorrowAPI(this.idDeviceBorrow, data).subscribe(res => {
      this.ngOnInit();
      this.child.showMycard(); 
    })
  }

  check() {
    this.btnValid = true;
  }

  setHiddenMyCard() {
    if (localStorage.getItem('role') === 'admin') {
      this.hiddenMyCard = false;
    } else {
      this.macApiService.getData(this.userId).subscribe(data => {
        this.objectToMyCard = data;
        console.log('<<<<<<<< มานี่แล้ว Link' + this.userId + '>>>>>>' + JSON.stringify(this.objectToMyCard));
        if (!this.objectToMyCard.borrowing) {
          this.hiddenMyCard = false;
          this.objectToMyCard = null;
        } else
          this.hiddenMyCard = true;
      });
    }
  }
}
