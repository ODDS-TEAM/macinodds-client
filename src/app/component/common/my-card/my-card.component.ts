import { Component, OnInit } from '@angular/core';
import { MacinoddsApiService } from '../../../service/macinodds-api.service';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css']
})
export class MyCardComponent implements OnInit {

  userId = localStorage.getItem('userId');
  result: any;
  hideCard = false;
  borrowDate: any;
  returnDate: any;
  returnMemo: string;
  returnLocation: string;
  pathImg:string;


  

  constructor(
    private macApiService: MacinoddsApiService
  ) {
  }

  ngOnInit() {
    this.test();
  }

  test() {
    if (localStorage.getItem('role') === 'admin') {
      this.hideCard = true;
      this.result = {
        userID: "",
        name: "",
        serial: "",
        spec: "",
        status: true,
        img: "add_device.jpg",
        location: "",
        borrowDate: "",
        returnDate: ""
      };
    } else {
      this.macApiService.getData(this.userId).subscribe(data => {
        this.result = data;
        if (this.result.status) {
          this.hideCard = true;
        }
        this.borrowDate = new Date(this.result.borrowDate).toLocaleDateString("pt-PT");
        this.returnDate = new Date(this.result.returnDate).toLocaleDateString("pt-PT");
        this.pathImg = 'http://139.5.146.213/assets/imgs/devices/'+this.result.img
      });
      this.result = {};
    }
  }

}
