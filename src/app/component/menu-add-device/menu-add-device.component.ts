import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-add-device',
  templateUrl: './menu-add-device.component.html',
  styleUrls: ['./menu-add-device.component.css']
})
export class MenuAddDeviceComponent implements OnInit {
  inName = "";
  inSerial = "";
  inSpec = "";
  inImg = "";
  inStatus = "";
  inHolder = "";

  constructor() { }

  ngOnInit() {
  }

}
