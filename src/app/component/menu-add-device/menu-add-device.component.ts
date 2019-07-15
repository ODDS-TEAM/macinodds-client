import { Component, OnInit, Input, ViewChild, ViewRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatRadioButton } from '@angular/material';

@Component({
  selector: 'app-menu-add-device',
  templateUrl: './menu-add-device.component.html',
  styleUrls: ['./menu-add-device.component.css'],
})
export class MenuAddDeviceComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
  ) { }

  @Input()


  ngOnInit() {

  }

}
