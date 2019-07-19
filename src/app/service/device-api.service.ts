import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MacinoddsApiService } from './macinodds-api.service';
@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {
  token = sessionStorage.getItem('token');
  macDeviceAPI = 'http://mac.odds.team/api/devices';
  // macDeviceAPI = 'https://5d008336d021760014b74fa8.mockapi.io/test/macs';
  // historyDeviceAPI = 'https://5d008336d021760014b74fa8.mockapi.io/test/history';
  historyDeviceAPI = 'http://mac.odds.team/api/borrowings';


  constructor(
    private http: HttpClient,
    private route: Router,
    private macinoddsService: MacinoddsApiService
  ) { }



  getMacApi() {
    console.log(this.macinoddsService.getHttpHeaderOption(),'>>>>++++')    
    return this.http.get(this.macDeviceAPI,this.macinoddsService.getHttpHeaderOption());
  }

  getMacIDApi(id) {
    return this.http.get(this.macDeviceAPI + '/' + id,this.macinoddsService.getHttpHeaderOption());
  }

  putMacAPI(id, data) {
    return this.http.put(this.macDeviceAPI + '/' + id, data,this.macinoddsService.getHttpHeaderOption());
  }

  postMacAPI(data) {
    return this.http.post(this.macDeviceAPI, data,this.macinoddsService.getHttpHeaderOption());
  }

  deleteMacAPI(id) {
    return this.http.delete(this.macDeviceAPI + '/' + id,this.macinoddsService.getHttpHeaderOption());
  }


  getHistoryAPI() {
    return this.http.get(this.historyDeviceAPI,this.macinoddsService.getHttpHeaderOption());
  }

  getHistoryIDApi(id) {
    return this.http.get(this.historyDeviceAPI + '/users/' + id,this.macinoddsService.getHttpHeaderOption());
  }

  getData(id) {
    return this.http.get(this.macDeviceAPI+'/' + id,this.macinoddsService.getHttpHeaderOption());
    // return this.http.get(this.macDeviceAPI +'/'+ id);
  }
  postBorrowAPI(id, data) {
    return this.http.post(this.macDeviceAPI + '/' + id + '/borrow', data,this.macinoddsService.getHttpHeaderOption());
  }

  postReturn(id, data) {
    return this.http.post(this.macDeviceAPI + '/' + id + '/return', data,this.macinoddsService.getHttpHeaderOption());
  }




}
