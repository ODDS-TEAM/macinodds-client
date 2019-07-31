import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { forkJoin } from 'rxjs';
import { MacinoddsApiService } from 'src/app/service/macinodds-api.service';
import * as JWT from 'jwt-decode';
import { User } from '../shared/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //test
  user: any;
  public name: any;

  constructor(
    private socialAuthService: AuthService,
    private macinoddsService: MacinoddsApiService,
    private route: Router,
  ) { }

  ngOnInit() {
    localStorage.clear();
    localStorage.removeItem('userResult');

  }


  oddsSignIn() {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        if (this.isOddsTeam(userData.email)) {
          this.loginGoogle(userData.idToken)
          localStorage.setItem('Username', userData.name);
          localStorage.setItem('email', userData.email);
          localStorage.setItem('image', userData.image);
        }
      }
    );
  }

  loginGoogle(idToken: string) {
    localStorage.clear();
    this.macinoddsService.getLoginGoogle(idToken).subscribe(res => {
      sessionStorage.setItem('token', 'Bearer ' + res.token);
      let decode = JWT(res.token);
      const decodeToString = JSON.stringify(decode);
      const decodeNew = JSON.parse(decodeToString);
      const role = decodeNew.role;
      localStorage.setItem('userId', decodeNew.id);
      localStorage.setItem('role', role);
      if (res.firstLogin) {
        this.route.navigate(['/register'])
      } else {
        if (localStorage.getItem('role') == 'admin') {
          this.route.navigate(['/admin']);
        } else {
          this.route.navigate(['/user']);
        }
      }
    })
  }

  private isOddsTeam(email: string): boolean {
    const host = email.slice(-10);
    if (host !== '@odds.team') {
      alert(`Sorry, account isn't Odds Team.`);
      return false;
    }
    return true;
  }
}