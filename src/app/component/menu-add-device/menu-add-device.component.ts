import { Component, OnInit, Input, ViewChild, ViewRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatRadioButton } from '@angular/material';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-add-device',
  templateUrl: './menu-add-device.component.html',
  styleUrls: ['./menu-add-device.component.css'],
})
export class MenuAddDeviceComponent implements OnInit {
  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  name: string;
  serial: string;
  spec: string;
  image = '';
  checker: string;
  status: boolean;
  holder: string;
  tel: string;
  imageDefault = '';
  fileToUpload: File = null;
  vaildatBT = false;

  options: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,
  ) { }

  @Input()
  checked: boolean;

  onSelectionChange() {
    if (this.checker === 'false') {
      this.status = false;
      this.holder = '';
      this.tel;
    } else {
      this.status = true;
      this.holder = '';
      this.tel;
    }
  }

  ngOnInit() {
    this.createForm();
    this.getDevice();
    this.onSelectionChange();
  }

  createForm() {
    this.options = this.formBuilder.group({
      name: '',
      serial: '',
      spec: '',
      image: '',
      status: '',
      holder: '',
      tel: ''
    });
  }


  getDevice() {
    // HTTP request by get() method
    // get data from Observable we need subscibe observer to working
    this.http.get('http://139.5.146.213:1323/api/devices').subscribe(data => {
      // get result from JSON response
      this.results = data;
    });
  }

  // check change image and show image in src
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageDefault = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log('file  fileToUpload ===  ' + this.fileToUpload);
  }

  onSubmit() {
    // create formData to post
    const formData: FormData = new FormData();
    formData.append('name', this.name);
    formData.append('serial', this.serial);
    formData.append('spec', this.spec);
    formData.append('status', this.status.toString());
    formData.append('img', this.fileToUpload);
    formData.append('holder', this.holder);
    formData.append('tel', this.tel);

    console.log(this.tel);
    console.log(JSON.stringify(formData));
    // post method
    if (window.confirm('ยืนยันการบันทึกข้อมูล')) {
      this.http.post('http://139.5.146.213:1323/api/devices', formData)
        .subscribe(result => {
          this.getDevice();

          console.log(result);
          this.resetFrom();
          this.imageDefault = '';
        });
    }
  }

  // method for reset data in field
  resetFrom() {
    this.options.reset();
    this.status = true;
    this.imageDefault = '';
    console.log('clear');

  }
  // check input in form
  // canSubmit() {
  //   if (this.name && this.serial && this.spec && this.imageDefault && this.status === false && this.holder && this.tel) {
  //     // is not empty
  //     this.vaildatBT = true;
  //   } else if (this.name && this.serial && this.spec && this.imageDefault && this.status === true && !this.holder && !this.tel) {
  //     // is not empty
  //     this.vaildatBT = true;
  //   } else {
  //     // is empty
  //     this.vaildatBT = false;
  //   }
  // }
}
