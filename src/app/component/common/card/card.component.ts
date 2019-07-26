import { MyCardComponent } from './../my-card/my-card.component';
import { Component, OnInit, Input } from '@angular/core';
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
  @Input() role: boolean;
  btnRole: boolean;
  @Input() hide = true;

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
    // HTTP request by get() method
    // get data from Observable we need subscibe observer to working
    this.macApiService.getMacApi().subscribe(data => {
      // get result from JSON response
      this.results = data;
      // console.log('print get all : ' + JSON.stringify(this.results[0]._id));
      console.log(this.results[0]);
      console.log(this.results);
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

  onSubmitBorrow(id) {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.localtime = (new Date(this.returnDate - tzoffset));
    this.localtime.setHours(12, 0, 0);
    console.log('localtime >>>>>>>>>', this.localtime);

    const localISOTime = (new Date(this.localtime)).toISOString();

    console.log('localISOTime >>>>>>>>>', localISOTime);

    const borrowData: FormData = new FormData();
    borrowData.append('returnDate', this.returnDate);
    // borrowData.append('token', token);
    console.log('returndate', localISOTime)
    console.log('borrowdata', borrowData)

    // post method
    const data = {
      "returnDate": localISOTime
    }
    console.log(data)
    this.macApiService.postBorrowAPI(this.idDeviceBorrow, data).subscribe(res => {
      location.reload();
      this.getDevice();
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
