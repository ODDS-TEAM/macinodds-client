import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  public editResults: any; // กำหนดตัวแปร เพื่อรับค่า
  name: string;
  serial: string;
  spec: string;
  image = '';
  status = true;
  holder: string;
  checker: string;
  imageDefault: string;
  imageChange: string;
  fileToUpload: File = null;
  disabledDivs = true;

  // Inject HttpClient มาใช้ใน component หรือ service.
  options: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.getDevice();
  }

  getDevice() {
    // ทำการเรียกใช้ HTTP request ผ่าน get() method
    // ซึ่งจะได้ข้อมูลกลับมาในรูปแบบ Observable เราต้อง subscibe ตัว observer จึงจะทำงาน
    // พอรอค่าที่จะถูกส่งกลับมาแล้วทำงาน
    this.http.get('http://139.5.146.213:1323/api/devices').subscribe(data => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      this.results = data;
      console.log('print get all : ' + JSON.stringify(this.results[0]._id));
    });
  }
}
