import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuServiceUserService, MenuItemUser, MenuUser } from '../service/menu-service-user.service';
import { Router } from '@angular/router';
import { MacinoddsApiService } from '../service/macinodds-api.service';


@Component({
  selector: 'app-side-nav-user',
  templateUrl: './side-nav-user.component.html',
  styleUrls: ['./side-nav-user.component.css']
})

export class SideNavUserComponent {
  menuGroupSelected: string;
  menuListUser: MenuItemUser[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private menuServiceUser: MenuServiceUserService,
              private router: Router,
              private macApiService : MacinoddsApiService) {
    this.menuListUser = this.menuServiceUser.getMenuList();
  }
  selectMenu(menuGroup: MenuUser) {
    if (this.menuGroupSelected === menuGroup.code) {
      this.menuGroupSelected = null;
      return;
    }
    this.menuGroupSelected = menuGroup.code;
  }

  signOut() {
    this.macApiService.signOut();
  }

}
