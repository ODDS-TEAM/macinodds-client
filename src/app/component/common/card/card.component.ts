import { Component, OnInit, Injectable, Input } from '@angular/core';
import { MenuViewAdminComponent } from '../../menu-view-admin/menu-view-admin.component';
import { MyDataServiceService } from '../../my-data-service.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MacinoddsApiService } from 'src/app/service/macinodds-api.service';
import { MenuViewUserComponent } from '../../menu-view-user/menu-view-user.component';






@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {
  @Input() hide = false;

  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  public editResults: any; // กำหนดตัวแปร เพื่อรับค่า
  name: string;
  serial: string;
  spec: string;
  image = '';
  status = true;
  holder: string;



  constructor( private data: MyDataServiceService,
               private router: Router,
               private breakpointObserver: BreakpointObserver,
               private macApiService: MacinoddsApiService) { }

  ngOnInit() {
    this.editResults = {};
    this.getDevice();
    this.data.currentData.subscribe(data => this.name = data);
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


}
