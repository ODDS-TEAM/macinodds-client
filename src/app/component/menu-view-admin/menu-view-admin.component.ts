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
  public editResults: any; // กำหนดตัวแปร เพื่อรับค่า
  name: string;
  serial: string;
  spec: string;
  image = '';
  status = true;
  holder: string;


  // Inject HttpClient มาใช้ใน component หรือ service.
  options: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.editResults = {};
    this.getDevice();
    this.createForm();
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
    this.http.get('http://139.5.146.213:1323/api/devices').subscribe(data => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      this.results = data;
      console.log('print get all : ' + JSON.stringify(this.results[0]._id));
      this.getDeviceByID(this.results[0]._id);
    });

  }

  getDeviceByID(id) {
    console.log('print id : ' + id);
    this.http.get('http://139.5.146.213:1323/api/devices/' + id).subscribe(data => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      this.editResults = data;
    });
  }

  deleteDevice(id, serial) {
    console.log('confirem delete : ' + id);
    if (window.confirm('Are you sure, you want to delete device serial number: ' + serial)) {
      this.http.delete('http://139.5.146.213:1323/api/devices/' + id).subscribe(data => {
        this.getDevice();
      });
    }
  }

  editDevice(id, serial) {
    this.http.get('http://139.5.146.213:1323/api/devices/' + id).subscribe(data => {
      this.editResults = data;
      console.log('print edit data : ' + data);
      console.log('print edit data JSON.stringify : ' + JSON.stringify(data));
      console.log('print edit editResults : ' + this.editResults);

      this.name = this.editResults.name;
      this.serial = this.editResults.serial;
      this.spec = this.editResults.spec;
      this.status = this.editResults.status;
      this.holder = this.editResults.holder;
      this.image = this.editResults.img;
    });
  }



  onSubmit(id) {

    const saveData = {
      name: this.name,
      serial: this.serial,
      spec: this.spec,
      status: this.status,
      holder: this.holder,
      img: this.image
    };

    console.log('Put data **** : ' + JSON.stringify(saveData));
    this.http.put('http://139.5.146.213:1323/api/devices/' + id, saveData).subscribe(data => {
      this.getDevice();
      console.log('Put data : ' + JSON.stringify(data));
    });

  }


  onDisable(status: boolean) {
    this.status = !status;
    this.holder = '';
  }

  resetFrom() {
    this.options.reset();
    console.log('clear');
  }
}
