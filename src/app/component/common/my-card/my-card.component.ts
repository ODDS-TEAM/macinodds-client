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

  constructor(
    private macApiService: MacinoddsApiService
  ) {
  }

  ngOnInit() {
    this.test();
  }

  test(){
    if (localStorage.getItem('role') === 'admin') {
      this.hideCard = true;
      this.result = {};
    }else {
      this.macApiService.getData(this.userId).subscribe(data => {
        this.result = data;
        if (this.result.status) {
          this.hideCard = true;
        }
        this.borrowDate = new Date(this.result.borrowDate).toLocaleDateString("pt-PT");
        this.returnDate = new Date(this.result.returnDate).toLocaleDateString("pt-PT");
      });
      this.result = {};
    }
  }
  
}
