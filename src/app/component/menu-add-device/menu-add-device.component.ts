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
  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  name: string;
  serial: string;
  spec: string;
  image = '';
  checker: string;
  status = true;
  holder: string;
  imageDefault = '/assets/imgs/logo4.png';
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
    } else {
      this.status = true;
      this.holder = '';
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
      holder: ''
    });
  }


  getDevice() {
    // ทำการเรียกใช้ HTTP request ผ่าน get() method
    // ซึ่งจะได้ข้อมูลกลับมาในรูปแบบ Observable เราต้อง subscibe ตัว observer จึงจะทำงาน
    // พอรอค่าที่จะถูกส่งกลับมาแล้วทำงาน
    this.http.get('http://139.5.146.213:1323/api/devices').subscribe(data => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      this.results = data;
    });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageDefault = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  onSubmit() {
    const addData = {
      name: this.name,
      serial: this.serial,
      spec: this.spec,
      status: this.status,
      holder: this.holder,
      img: this.imageDefault
    };

    if (window.confirm('POST ?')) {
      this.http.post('http://139.5.146.213:1323/api/devices', addData)
        .subscribe(result => {
          this.getDevice();
          console.log(result);
          // },
          //   (err: HttpErrorResponse) => {
          //     // กรณี error
          //     if (err.error instanceof Error) {
          //       // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
          //       console.log('An error occurred:', err.error.message);
          //     } else { // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error
          //       console.log(Backend returned code ${ err.status }, body was: ${ err.error });
          //     }
          //
          this.resetFrom();
          this.imageDefault = '/assets/imgs/logo4.png';
        });
    }
  }

  resetFrom() {
    this.options.reset();
    this.status = true;
    this.imageDefault = '/assets/imgs/logo4.png';
    console.log('clear');

  }

  canSubmit() {
    if (this.name && this.serial && this.spec && this.imageDefault && this.status === false && this.holder) {
      // is not empty
      this.vaildatBT = true;
    } else if (this.name && this.serial && this.spec && this.imageDefault && this.status === true && !this.holder) {
      // is not empty
      this.vaildatBT = true;
    } else {
      // isn't empty
      this.vaildatBT = false;
    }
  }
}
