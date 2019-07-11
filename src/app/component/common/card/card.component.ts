import { Component, OnInit, Injectable, Input } from '@angular/core';
import { MenuViewAdminComponent } from '../../menu-view-admin/menu-view-admin.component';
import { MyDataServiceService } from '../../my-data-service.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MacinoddsApiService } from 'src/app/service/macinodds-api.service';
import { MenuViewUserComponent } from '../../menu-view-user/menu-view-user.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';






@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {
  @Input() role: boolean;
  btnRole: boolean;

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

  constructor(private data: MyDataServiceService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private macApiService: MacinoddsApiService,
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {
    this.editResults = {};
    this.getDevice();
    this.data.currentData.subscribe(data => this.name = data);
    this.createBorrowForm();
    console.log(this.returnDate);
  }

  // public hideButton() {
  //   this.hide = !this.hide;
  // }

  getDevice() {
    // HTTP request by get() method
    // get data from Observable we need subscibe observer to working
    this.macApiService.getMacApi().subscribe(data => {
      // get result from JSON response
      this.results = data;
      console.log('print get all : ' + JSON.stringify(this.results[0]._id));
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
    this.router.navigate(['/admin/app/edit-admin']);
  }

  createBorrowForm() {
    this.borrowForm = this.formBuilder.group({
      borrow: ['', Validators.required]
      // borrow: new FormControl('', Validators.required)
    });
  }
  onSubmitBorrow() {

    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.localtime = (new Date(this.returnDate - tzoffset));
    this.localtime.setHours(12, 0, 0);
    console.log('localtime >>>>>>>>>', this.localtime);

    const localISOTime = (new Date(this.localtime)).toISOString();

    console.log('localISOTime >>>>>>>>>', localISOTime);


    // console.log('form here >>>>>>>' + JSON.stringify( '>>>> date >>>' + localISOTime));
    // post method
    if (window.confirm('ยืนยันการบันทึกข้อมูล')) {
      this.http.post('http://mac.odds.team/api/mac', localISOTime)
        .subscribe(result => {

          console.log(result);
          this.router.navigate(['/admin/app/menu-view-admin']);
        });
    }

  }
  check() {
    console.log(this.returnDate);
  }


}
