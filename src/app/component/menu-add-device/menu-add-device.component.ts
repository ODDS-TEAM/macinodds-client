import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';




@Component({
  selector: 'app-menu-add-device',
  templateUrl: './menu-add-device.component.html',
  styleUrls: ['./menu-add-device.component.css']
})
export class MenuAddDeviceComponent implements OnInit {
  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  inName: string;
  inSerial: string;
  inSpec: string;
   inImage: any;
  //inImage = '';
  inStatus: boolean;
  inHolder: string;

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

  onSubmit() {
    const addData = {
      name: this.inName,
      serial: this.inSerial,
      spec: this.inSpec,
      status: this.inStatus,
      holder: this.inHolder,
      img: this.inImage
    }
    
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
      });
  }

}
