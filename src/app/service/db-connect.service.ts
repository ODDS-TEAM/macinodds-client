import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, from, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DbConnectService {

  macDeviceAPI = 'http://mac.odds.team/api/mac';
  historyDeviceAPI = 'https://5d008336d021760014b74fa8.mockapi.io/test/history';

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }



  getMacApi() {
    return this.http.get(this.macDeviceAPI);
  }

  getMacIDApi(id) {
    return this.http.get(this.macDeviceAPI + '/' + id);
  }

  putMacAPI(id, data) {
    return this.http.put(this.macDeviceAPI + '/' + id, data);
  }

  postMacAPI(data) {
    return this.http.post(this.macDeviceAPI, data);
  }

  deleteMacAPI(id) {
    return this.http.delete(this.macDeviceAPI + '/' + id);
  }


  getHistoryAPI() {
    return this.http.get(this.historyDeviceAPI);
  }

  getHistoryIDApi(id) {
    return this.http.get(this.historyDeviceAPI + '/' + id);
  }


}
