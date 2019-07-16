import { puts } from 'util';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../shared/login';
import { User } from '../shared/user';
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class MacinoddsApiService {
  //  urlPath = "https://atb-macinodds.herokuapp.com/devices";
   urlPath = 'https://5d008336d021760014b74fa8.mockapi.io/test/macs/';

  listData: User[] = [];
  siteName: string;
  getCustomerId = new BehaviorSubject<string>(null);
  getProductOwnerId = new BehaviorSubject<string>(null);
  dailyIncome = '';
  id = sessionStorage.getItem('idUser');
  private userId = this.id;
  readonly apiPath = environment.api;
  individualListed: User;
  corporateListed: User;



  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: Router) { }

  // getIndividualListed = () => this.individualListed;


  forCheckTokenPleaseRemoveMeIfFlowLoginFinnished(): Observable<any> {
    return Observable.create(observer => {
      const checkTokenInterval = setInterval(() => {
        if (sessionStorage.getItem('token')) {
          observer.next();
          clearInterval(checkTokenInterval);
        }
      }, 200);
    });
  }

  initDataService() {
    if (this.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished()) {
      this.getListIncomeIndividual().subscribe(individual => {
        this.individualListed = individual;
      });

      this.getListIncomeCorporate().subscribe(corporate => {
        this.corporateListed = corporate;
      });
    }
  }

  getListIncomeIndividual(): Observable<User> {
    return this.http.get<User>(
      `${this.apiPath}incomes/status/individual`,
      this.getHttpHeaderOption()
    );
  }

  getListIncomeCorporate(): Observable<User> {
    return this.http.get<User>(
      `${this.apiPath}incomes/status/corporate`,
      this.getHttpHeaderOption()
    );
  }



  getHttpHeaderOption(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token')
      })
    };
    return httpOptions;
  }

  // updateUser(id: string, user: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiPath}users/${id}`, user,
  //       this.getHttpHeaderOption()
  //   );
  // }


  getLoginGoogle(idtoken: string): Observable<Login> {
    return this.http.post<any>('http://localhost:8080/v1/login-google', { 'token': idtoken });
  }

  signOut() {
    this.authService.signOut();
    console.log(' You are sign out ');
    this.route.navigate(['/login']);
    sessionStorage.clear();

  }


  
// Mock API
  getMacApi() {
    return this.http.get(this.urlPath);
  }

  getMacIDApi(id) {
    return this.http.get(this.urlPath +'/' + id);
  }

  putMacAPI(id, data) {
    return this.http.put(this.urlPath +'/' + id, data);
  }

  postMacAPI(data) {
    return this.http.post(this.urlPath, data);
  }
  
  deleteMacAPI(id) {
    return this.http.delete(this.urlPath +'/' + id);
  }

//Real API
  // getMacApi() {
  //   return this.http.get('http://mac.odds.team/api/devices');
  // }
    
  // getMacIDApi(id) {
  //   return this.http.get('http://mac.odds.team/api/devices/' + id);
  // }
    
  // putMacAPI(id, data) {
  //   return this.http.put('http://mac.odds.team/api/devices/' + id, data);
  // }
    
  // postMacAPI(data) {
  //   return this.http.post('http://mac.odds.team/api/devices', data);
  // deleteMacAPI(id) {
  //       return this.http.delete('http://mac.odds.team/api/devices/' + id);
  // }

  // End API for Mac device

  //test
  getAdminAPI() {
    return this.http.get('https://5d008336d021760014b74fa8.mockapi.io/test/user/5d25038577a26e3df3f6eea1');
  }
  getUserAPI() {
    //borrowed user
    // return this.http.get('https://5d008336d021760014b74fa8.mockapi.io/test/user/5d250385a67b86e4230cd5d5');

    //not borrow user
    return this.http.get('https://5d008336d021760014b74fa8.mockapi.io/test/user/5d250385aa920601650f984d');
  }
  getData(id) {
    return this.http.get('https://5d008336d021760014b74fa8.mockapi.io/test/myMac/' + id);
  }  
}
