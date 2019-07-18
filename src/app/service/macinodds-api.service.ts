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
  role = localStorage.getItem('role');
  imageProfile = localStorage.getItem('role');
  name = localStorage.getItem('role');
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

  getLoginGoogle(idtoken: string): Observable<Login> {
    return this.http.post<Login>(`${this.apiPath}/login`, { 'token': idtoken });
  }

  // getLoginGoogle(idtoken: string): Observable<Login> {
  //   return this.http.post<Login>('http://localhost:8080/v1/login-google', { 'token': idtoken });
  // }

  postUsertoMock(id: string, role: string, NAME: string, MAIL: string, PHOTO: string): Observable<User> {
    return this.http.post<User>('https://5d008336d021760014b74fa8.mockapi.io/test/user', { '_id': id, 'role': role, 'name': NAME, 'email': MAIL, 'imgProfile': PHOTO });
  }

  getUserbyId(id: string = this.userId) {
    return this.http.get<User>('http://localhost:8080/v1/login-google',
      this.getHttpHeaderOption());
  }

  updateUser(user) {
    console.log('toptopy =' + user);
    return this.http.put(`${this.apiPath}/register`, user,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        })
      });

  }


  signOut() {
    this.authService.signOut();
    console.log(' You are sign out ');
    this.route.navigate(['/login']);
    sessionStorage.clear();

  }


  getAdminAPI() {
    return this.http.get('https://5d008336d021760014b74fa8.mockapi.io/test/user/5d25038577a26e3df3f6eea1');
  }
  getUserAPI() {
    //borrowed user
    // return this.http.get('https://5d008336d021760014b74fa8.mockapi.io/test/user/5d250385a67b86e4230cd5d5');

    //not borrow user
    return this.http.get('https://5d008336d021760014b74fa8.mockapi.io/test/user/5d250385aa920601650f984d');
  }
}