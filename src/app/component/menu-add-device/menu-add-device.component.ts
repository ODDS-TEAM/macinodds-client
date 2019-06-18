import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu-add-device',
  templateUrl: './menu-add-device.component.html',
  styleUrls: ['./menu-add-device.component.css']
})
export class MenuAddDeviceComponent implements OnInit {
  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  name: string;
  serial: string;
  spec: string;
  image = '';
  status = true;
  holder: string;

  options: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getDevice();
  }

  createForm() {
    this.options = this.formBuilder.group({
      name: '',
      serial: '',
      spec: '',
      image: '',
      status: false,
      holder: ''
    });
  }


  getDevice() {
    // ทำการเรียกใช้ HTTP request ผ่าน get() method
    // ซึ่งจะได้ข้อมูลกลับมาในรูปแบบ Observable เราต้อง subscibe ตัว observer จึงจะทำงาน
    // พอรอค่าที่จะถูกส่งกลับมาแล้วทำงาน
    this.http.get('https://5d008336d021760014b74fa8.mockapi.io/test/devices').subscribe(data => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      this.results = data;
    });
  }

  onSubmit() {
    const addData = {
      name: this.name,
      serial: this.serial,
      spec: this.spec,
      status: this.status,
      holder: this.holder,
      img: this.image
    };

    if (window.confirm('POST ?')) {
      this.http.post('https://5d008336d021760014b74fa8.mockapi.io/test/devices', addData)
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
        });
    }
  }

  resetFrom() {
    this.options.reset();
    console.log('clear');
  }

  onDisable(status: boolean) {
    this.status = !status;
    this.holder = '';
  }

}
