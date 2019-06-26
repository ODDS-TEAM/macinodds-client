import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyDataServiceService {
  private DataService = new BehaviorSubject('id');
  currentData = this.DataService.asObservable();

  constructor() { }

  changeData(data: string) {
    this.DataService.next(data);
  }

}
