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
  role = true;
  userId = localStorage.getItem('userId');

  constructor(private macApiService: DeviceApiService) { }

  ngOnInit() {
    this.checkRole();
  }

  checkRole() {
    if (localStorage.getItem('role') === 'admin') {
      this.getHistory();
    } else {
      this.role = false;
      this.getUserHistory();
    }
  }

  getHistory() {
    this.macApiService.getHistoryAPI().subscribe(data => {
      // get result from JSON response
      this.results = data;
    });
  }
  getUserHistory() {
    this.macApiService.getHistoryIDApi(localStorage.getItem('userId')).subscribe(data => {
      // get result from JSON response
      this.results = data;
    });
  }
}