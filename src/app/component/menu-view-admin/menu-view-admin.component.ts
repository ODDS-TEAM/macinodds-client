import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { puts } from 'util';

@Component({
  selector: 'app-menu-view-admin',
  templateUrl: './menu-view-admin.component.html',
  styleUrls: ['./menu-view-admin.component.css']
})
export class MenuViewAdminComponent implements OnInit {

  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  inName: string;
  inSerial: string;
  inSpec: string;
  // inImage: string;
  inImage = '';
  inStatus: boolean;
  inHolder: string;

  // Inject HttpClient มาใช้ใน component หรือ service.
  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.getDevice();
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


  deleteDevice(id, serial) {
    console.log('confirem delete : ' + id);
    if (window.confirm('Are you sure, you want to delete device serial number: ' + serial)) {
      this.http.delete('https://5d008336d021760014b74fa8.mockapi.io/test/devices/' + id).subscribe(data => {
        this.getDevice();
        // this.getDevice();

      });
    }
  }

  editDevice(id) {
    const addData = {
      name: this.inName,
      serial: this.inSerial,
      spec: this.inSpec,
      status: this.inStatus,
      holder: this.inHolder,
      img: this.inImage
    }

    // this.http.put('https://5d008336d021760014b74fa8.mockapi.io/test/devices/' + id, addData).subscribe(data => {
    //   this.getDevice();
    //   console.log(data);
    // });
  }

}
