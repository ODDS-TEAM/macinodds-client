import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MacinoddsApiService } from './macinodds-api.service';

const baseApi = 'https://mac.odds.team/api'
@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {
  token = sessionStorage.getItem('token');
  macDeviceApi = baseApi + '/devices';
  macBorrowApi = baseApi + '/borrow/devices/'
  macReturnApi = baseApi + '/return/devices/'
  historyDeviceAPI = 'https://mac.odds.team/api/borrowings';

  constructor(
    private http: HttpClient,
    private route: Router,
    private macinoddsService: MacinoddsApiService
  ) { }

  getMacApi() {
    return this.http.get(this.macDeviceApi, this.macinoddsService.getHttpHeaderOption());
  }

  getMacIDApi(id) {
    return this.http.get(this.macDeviceApi + '/' + id, this.macinoddsService.getHttpHeaderOption());
  }

  putMacAPI(id, data) {
    return this.http.put(this.macDeviceApi + '/' + id, data, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token')
      })
    }
    );
  }

  postMacAPI(data) {

    return this.http.post(this.macDeviceApi, data, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token')
      })
    }
    );
  }

  deleteMacAPI(id) {
    return this.http.delete(this.macDeviceApi + '/' + id, this.macinoddsService.getHttpHeaderOption());
  }

  getMyDevice() {
    return this.http.get(this.macDeviceApi + '/users/' + localStorage.getItem("userId"), this.macinoddsService.getHttpHeaderOption());
  }

  getHistoryAPI() {
    return this.http.get(this.historyDeviceAPI, this.macinoddsService.getHttpHeaderOption());
  }

  getHistoryIDApi(id) {
    return this.http.get(this.historyDeviceAPI + '/users/' + id, this.macinoddsService.getHttpHeaderOption());
  }

  getData(id) {
    return this.http.get(this.macDeviceApi + '/' + id, this.macinoddsService.getHttpHeaderOption());
    // return this.http.get(this.macDeviceAPI +'/'+ id);
  }
  postBorrowAPI(deviceID: string, data) {
    return this.http.post(this.macBorrowApi + deviceID, data, this.macinoddsService.getHttpHeaderOption());
  }

  postReturn(deviceID: string, data) {
    return this.http.post(this.macReturnApi + deviceID, data, this.macinoddsService.getHttpHeaderOption());
  }
}
