import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { forkJoin } from 'rxjs';
import { MacinoddsApiService } from 'src/app/service/macinodds-api.service';
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
    private route: Router
  ) { }

  ngOnInit() {
    localStorage.clear();
    localStorage.removeItem('userResult');

  }


  oddsSignIn() {
    let socialPlatformProvider;
    console.log(socialPlatformProvider)
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log("User data : ", JSON.stringify(userData));
        if (this.isOddsTeam(userData.email)) {
          this.loginGoogle(userData.idToken)
          localStorage.setItem('Username', userData.name);
          localStorage.setItem('email', userData.email);
          localStorage.setItem('image', userData.image);

          // sessionStorage.setItem('NAME', userData.name);
          // sessionStorage.setItem('MAIL', userData.email);
          // sessionStorage.setItem('PHOTO', userData.image);
          //  this.route.navigate(['/first-login']);
          console.log(" sign in data : ", userData);
        }
      }
    );
  }

  loginGoogle(idToken: string) {
    this.macinoddsService.getLoginGoogle(idToken).subscribe(res => {
      console.log('res : ' + JSON.stringify(res));
      sessionStorage.setItem('token', 'Bearer' + res.token);
      console.log('res.token : ' + res.token);
      // this.macinoddsService.initDataService();
      sessionStorage.setItem('idUser', res.user.id);
      sessionStorage.setItem('fullName', res.user.fullName);
      sessionStorage.setItem('emailODDS', res.user.email)
      sessionStorage.setItem('role', res.user.role);
      sessionStorage.setItem('photo', res.user.imageProfile);
      //................LocalStorage..................
      localStorage.setItem('role', res.user.role);

      //...............USER...........................
      // console.log('res.user.first : ' + res.user.firstName);
      // console.log('res.user.last : ' + res.user.lastName);
      console.log('res.user.fullName : ' + res.user.fullName);
      console.log('res.user.email : ' + res.user.email);
      console.log('res.user.id : ' + res.user.id);
      console.log('res.user.role : ' + res.user.role);
      console.log('res.user.photo : ' + res.user.imageProfile);
      console.log('res.user : ' + JSON.stringify(res.user));
      //..............RES............................
      // console.log('res.first : ' + res.firstName);
      // console.log('res.last : ' + res.lastName);
      // console.log('res.id : ' + res.id);
      // console.log('res.role : ' + res.role);
      // console.log('res.photo : ' + res.image);
      // console.log('res.firstLogin : ' + res.firstLogin);

      // //...................LOGIN...................
      // console.log('res.login : ' + res.login);
      // console.log('res.login.firstLogin : ' + res.login.firstLogin);
      // console.log('res.login.token : ' + res.login.token);
      // console.log('res.login.idToken : ' + res.login.idToken);

      //..............SESSIONSTORAGE.................
      // console.log('session-idUser : ' + res.login);
      // console.log('session-firstName : ' + res.login.firstLogin);
      // console.log('session-photoURL : ' + res.login.token);
      // console.log('session- : ' + res.login.idToken);




      if (res.firstLogin === true) {

        this.route.navigate(['/first-login'])
      } else {
        // this.getUser();
        if (res.user.role === 'admin') {
          this.route.navigate(['/admin']);
        } else {
          this.route.navigate(['/user']);
        }
      }
      //function is empty
      // this.cacheData();
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

  // function not complete
  cacheData() {
    const individualListed = this.macinoddsService.getListIncomeIndividual();
    const corporateListed = this.macinoddsService.getListIncomeCorporate();

    forkJoin([corporateListed, individualListed]).subscribe(
      result => {
        this.macinoddsService.corporateListed = result[0];
        this.macinoddsService.individualListed = result[1];
      }
    );
  }

  //test

  getUser() {
    this.macinoddsService.getUserAPI().subscribe(data => {
      console.log(data)
      this.user = data;
      localStorage.setItem('userId', this.user._id);
      // localStorage.setItem('Username', this.user.name);
      // localStorage.setItem('email', this.user.email);
      // localStorage.setItem('image', this.user.imgProfile);
      // localStorage.setItem('role', this.user.role);
      this.route.navigate(['/user']);
    });
  }

}