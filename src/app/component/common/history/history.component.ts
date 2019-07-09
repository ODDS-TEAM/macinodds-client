import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { DbConnectService } from 'src/app/service/db-connect.service';


export interface HistoryElement {
  _id: string;
  name: string;
  macName: string;
  loanDate: string;
  returnedDate: string;
}


const ELEMENT_DATA: HistoryElement[] = [];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})



export class HistoryComponent implements OnInit {
  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  displayedColumns: string[] = ['number', 'name', 'macName', 'loanDate' , 'returnedDate'];
  dataSource = new HistoryDataSource();

  constructor(private dbConnect: DbConnectService) { }

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
  this.dbConnect.getHistoryAPI().subscribe(data => {
    // get result from JSON response
    this.results = data;
  });
  }

}


export class HistoryDataSource extends DataSource<HistoryElement> {
  /** Stream of data that is provided to the table. */
  data = new BehaviorSubject<HistoryElement[]>(ELEMENT_DATA);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<HistoryElement[]> {
    return this.data;
  }

  disconnect() {}
}
