import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { forkJoin } from 'rxjs';
import { MacinoddsApiService } from 'src/app/service/macinodds-api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService,
    private router: Router,
    private macinoddsService: MacinoddsApiService
  ) { }

  ngOnInit() {
  }

  
  socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        if (this.isOddsTeam(userData.email)){
        // this.loginGoogle(userData.idToken)
        this.router.navigate(['/admin/app/menu-view-admin']);
        console.log(socialPlatform + " sign in data : " , userData);
        }
      }
    );
  }

  loginGoogle(idToken: string) {
    this.macinoddsService.getLoginGoogle(idToken).subscribe(res => {
      sessionStorage.setItem('token', 'Bearer' + res.token);
      this.macinoddsService.initDataService();
      sessionStorage.setItem('idUser', res.user.id);
      sessionStorage.setItem('firstName', res.user.firstName);
      if (res.user.role === 'admin'){
        this.router.navigate(['/admin/app/menu-view-admin']);
      } else {
        this.router.navigate([res.user.role]);
      }
      //function is empty
      this.cacheData();
    })
  }

  private isOddsTeam(email: string): boolean {
    if (!email || email.length < 10) {
      alert('Email is invalid.');
      return false;
    }

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


}
