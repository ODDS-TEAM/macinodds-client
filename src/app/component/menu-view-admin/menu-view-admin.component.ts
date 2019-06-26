import { MyDataServiceService } from './../my-data-service.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { puts } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-view-admin',
  templateUrl: './menu-view-admin.component.html',
  styleUrls: ['./menu-view-admin.component.css']
})
export class MenuViewAdminComponent implements OnInit {

  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  public editResults: any; // กำหนดตัวแปร เพื่อรับค่า
  name: string;
  serial: string;
  spec: string;
  image: any = null;
  status = true;
  holder: string;

  // Inject HttpClient มาใช้ใน component หรือ service.
  options: FormGroup;
  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private data: MyDataServiceService,
              private router: Router,
            ) { }

  ngOnInit() {
    this.editResults = {};
    this.getDevice();
    this.createForm();
    this.data.currentData.subscribe(data => this.name = data);
  }

  createForm() {
    this.options = this.formBuilder.group({
      name: '',
      serial: '',
      spec: '',
      image: '',
      status: '',
      holder: ''
    });
  }


  getDevice() {
    // HTTP request by get() method
    // get data from Observable we need subscibe observer to working
    this.http.get('http://139.5.146.213:1323/api/devices').subscribe(data => {
      // get result from JSON response
      this.results = data;
      console.log('print get all : ' + JSON.stringify(this.results[0]._id));
    });
  }

  // get device id for show data
  getDeviceByID(id) {
    console.log('print id : ' + id);
    this.http.get('http://139.5.146.213:1323/api/devices/' + id).subscribe(data => {
      // read result form JSON response
      this.editResults = data;
    });
  }

  // delete device when click button by id device
  deleteDevice(id, serial) {
    console.log('confirem delete : ' + id);
    if (window.confirm('Are you sure, you want to delete device serial number: ' + serial)) {
      this.http.delete('http://139.5.146.213:1323/api/devices/' + id).subscribe(data => {
        this.getDevice();
      });
    }
  }

  // method for when click edit button
  editDevice(id) {
    this.data.changeData(id);
    this.router.navigate(['/admin/app/edit-admin']);
  }
}




