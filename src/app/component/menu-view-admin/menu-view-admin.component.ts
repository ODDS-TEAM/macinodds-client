import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { puts } from 'util';

@Component({
  selector: 'app-menu-view-admin',
  templateUrl: './menu-view-admin.component.html',
  styleUrls: ['./menu-view-admin.component.css']
})
export class MenuViewAdminComponent implements OnInit {

  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  name: string;
  serial: string;
  spec: string;
  // image: string;
  image = '';
  status= true;
  holder: string;



  // Inject HttpClient มาใช้ใน component หรือ service.
  options: FormGroup;
  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
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


  deleteDevice(id, serial) {
    console.log('confirem delete : ' + id);
    if (window.confirm('Are you sure, you want to delete device serial number: ' + serial)) {
      this.http.delete('https://5d008336d021760014b74fa8.mockapi.io/test/devices/' + id).subscribe(data => {
        this.getDevice();
        // this.getDevice();

      });
    }
  }

  onDisable(status: boolean) {
    this.status = !status;
    this.holder = '';
  }

  // editDevice(id) {
  //   const addData = {
  //     name: this.name,
  //     serial: this.serial,
  //     spec: this.spec,
  //     status: this.status,
  //     holder: this.holder,
  //     img: this.image
  //   }

  //   this.http.put('https://5d008336d021760014b74fa8.mockapi.io/test/devices/' + id, addData).subscribe(data => {
  //     this.getDevice();
  //     console.log(data);
  //   });
  // }

}
