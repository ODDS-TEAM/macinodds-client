import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  // macDeviceAPI = 'http://mac.odds.team/api/devices';s
  macDeviceAPI = 'https://5d008336d021760014b74fa8.mockapi.io/test/macs';
  // historyDeviceAPI = 'https://5d008336d021760014b74fa8.mockapi.io/test/history';
  historyDeviceAPI = 'http://mac.odds.team/api/borrowings';


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
    return this.http.get(this.historyDeviceAPI + '/users/' + id);
  }

  getData(id) {
    return this.http.get(this.macDeviceAPI+'/' + id);
    // return this.http.get(this.macDeviceAPI +'/'+ id);
  }
  postBorrowAPI(id, data) {
    return this.http.post(this.macDeviceAPI + '/' + id + '/borrow', data);
  }

  postReturn(id, data) {
    return this.http.post(this.macDeviceAPI + '/' + id + '/return', data);
  }

  // test mockAPI
  getAdminAPI() {
    return this.http.get('https://5d008336d021760014b74fa8.mockapi.io/test/user/5d25038577a26e3df3f6eea1');
  }
  getUserAPI() {
    // borrowed user
    // return this.http.get('https://5d008336d021760014b74fa8.mockapi.io/test/user/5d250385a67b86e4230cd5d5');

    // not borrow user
    return this.http.get('https://5d008336d021760014b74fa8.mockapi.io/test/user/5d250385aa920601650f984d');
  }


}
