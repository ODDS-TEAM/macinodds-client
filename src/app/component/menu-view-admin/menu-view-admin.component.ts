import { MyDataServiceService } from './../my-data-service.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { puts } from 'util';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

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
  image = '';
  status = true;
  holder: string;
  checker: string;
  imageDefault: string;
  imageChange: string;
  fileToUpload: File = null;
  disabledDivs = true;

  // Inject HttpClient มาใช้ใน component หรือ service.
  options: FormGroup;
  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private data: MyDataServiceService,
              private router: Router,
              private breakpointObserver: BreakpointObserver,
  ) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isWeb$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.WebLandscape,
    Breakpoints.WebPortrait,
    Breakpoints.Web,
    Breakpoints.Tablet
  ])
    .pipe(
      map(result => result.matches)
    );

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
    this.http.get('http://mac.odds.team/api/mac').subscribe(data => {
      // get result from JSON response
      this.results = data;
      console.log('print get all : ' + JSON.stringify(this.results[0]._id));
    });
  }

  // get device id for show data
  getDeviceByID(id) {
    console.log('print id : ' + id);
    this.http.get('http://mac.odds.team/api/mac/' + id).subscribe(data => {
      // read result form JSON response
      this.editResults = data;
    });
  }

  // delete device when click button by id device
  deleteDevice(id, serial) {
    console.log('confirem delete : ' + id);
    if (window.confirm('Are you sure, you want to delete device serial number: ' + serial)) {
      this.http.delete('http://mac.odds.team/api/mac/' + id).subscribe(data => {
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




