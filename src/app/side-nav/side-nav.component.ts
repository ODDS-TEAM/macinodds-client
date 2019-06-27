import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuServiceService, MenuItem, Menu } from '../service/menu-service.service';
import { MenuServiceUserService, MenuItemUser, MenuUser } from '../service/menu-service-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  appName = 'Macinodds';

  menuGroupSelected: string;
  menuList: MenuItem[];
  menuListUser: MenuItemUser[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    isWeb$: Observable<boolean> = this.breakpointObserver.observe([
      Breakpoints.WebLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.Web,
      Breakpoints.Tablet
    ])
    .pipe(
      map(result => result.matches)
    );



  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuService: MenuServiceService,
    private menuServiceUser: MenuServiceUserService,
    private router: Router
  ) {
    this.menuList = this.menuService.getMenuList();
    this.menuListUser = this.menuServiceUser.getMenuList();
  }

  selectMenu(menuGroup: Menu) {
    if (this.menuGroupSelected === menuGroup.code) {
      this.menuGroupSelected = null;
      return;
    }
    this.menuGroupSelected = menuGroup.code;
  }



}
