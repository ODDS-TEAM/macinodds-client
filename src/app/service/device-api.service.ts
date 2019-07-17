import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  macDeviceAPI = 'http://mac.odds.team/api/devices';
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

  getHistoryIDApi() {
    return this.http.get('https://5d2bf6108c90070014971ed9.mockapi.io/userHistory');
  }
}
