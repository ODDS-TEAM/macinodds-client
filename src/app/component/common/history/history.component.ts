import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { DeviceApiService } from 'src/app/service/device-api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})



export class HistoryComponent implements OnInit {
  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  role: boolean = true;
  userId = localStorage.getItem('userId');

  // id: string;
  // date: string;
  // activity: string;
  // userID: string;
  // macID: string;
  // returnedDate: string;
  // memo: string;
  // location: string;

  constructor(private device: DeviceApiService) { }

  ngOnInit() {
    this.checkRole();
  }

  checkRole() {
    if (localStorage.getItem('role') === 'admin') {
      this.getHistory();
    } else {
      this.role = false;
      console.log(this.userId);
      this.getUserHistory();
    }
  }

  getHistory() {
    console.log('get history -------');
    this.device.getHistoryAPI().subscribe(data => {
      // get result from JSON response
      this.results = data;
      console.log(this.results);
    });
  }
  getUserHistory() {
    this.device.getHistoryIDApi().subscribe(data => {
      // get result from JSON response
      this.results = data;
      console.log(this.results);
    });
  }
  
}


