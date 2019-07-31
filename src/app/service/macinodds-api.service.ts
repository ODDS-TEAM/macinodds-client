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

  id = sessionStorage.getItem('idUser');
  private userId = this.id;
  readonly apiPath = environment.api;

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

  updateUser(user) {
    return this.http.patch(`${this.apiPath}/register`, user, {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token')
      })
    }
    );
  }
  signOut() {
    this.authService.signOut();
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigate(['/login']);
    
  }
}