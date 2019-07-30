import { Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-menu-add-device',
  templateUrl: './menu-add-device.component.html',
  styleUrls: ['./menu-add-device.component.css'],
})
export class MenuAddDeviceComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {}
}
