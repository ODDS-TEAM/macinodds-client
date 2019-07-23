import { puts } from 'util';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../shared/login';
import { User } from '../shared/user';
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    private route: Router,
    public jwtHelper: JwtHelperService, ) { }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  // getIndividualListed = () => this.individualListed;

  getHttpHeaderOption(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token')
      })
    };
    return httpOptions;
  }

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





  getLoginGoogle(idtoken: string): Observable<Login> {
    return this.http.post<Login>(`${this.apiPath}/login`, { 'token': idtoken });
  }

  getUserbyId(id: string = this.userId) {
    return this.http.get<User>('http://localhost:8080/v1/login-google',
      this.getHttpHeaderOption());
  }

  updateUser(user) {
    console.log('toptopy =' + user);
    return this.http.patch(`${this.apiPath}/register`, user,{
      headers: new HttpHeaders({
          Authorization: sessionStorage.getItem('token')
      })
  }
);

  }


  signOut() {
    this.authService.signOut();
    console.log(' You are sign out ');
    this.route.navigate(['/login']);
    sessionStorage.clear();

  }

}