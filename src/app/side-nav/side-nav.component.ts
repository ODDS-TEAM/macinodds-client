import { Component, Input, OnInit, ViewChild, ContentChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuServiceService, MenuItem, Menu } from '../service/menu-service.service';
import { Router } from '@angular/router';
import { MacinoddsApiService } from '../service/macinodds-api.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  roleCheck : Boolean;
  rountPath:string;
  name = localStorage.getItem('Username');
  email = localStorage.getItem('email');
  profilePic = localStorage.getItem('image');
  UserRole: any;
  role: any;
   isHandset: boolean = false;
  opened: boolean = true;

  @ViewChild('drawer', { static: false }) private sidenav: MatSidenav;


  ngOnInit() {
    this.checkRow();
  }

  menuGroupSelected: string;
  menuList: MenuItem[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.Handset,
    Breakpoints.TabletPortrait
  ])
    .pipe(
      map(result => result.matches)
    );



  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuService: MenuServiceService,
    private router: Router,
    private macApiService: MacinoddsApiService
  ) {
    
    // boolean check role
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
      
    ]).subscribe(
      result => {
        if (result.matches) {
          this.isHandset = true;
        } else {
          this.isHandset = false;
        }
        console.log('opened = ', this.opened)
        console.log('isHandSet = ', this.isHandset)


      }
    )
  }



checkRow(){
   
  // this.roleCheck = (localStorage.getItem('role') == 'admin');
  // console.log('roleCheck >>>>>  '+this.roleCheck);

  // console.log('Role >>>>>  '+localStorage.getItem('role') + '>>>>>' +this.role);
  if (localStorage.getItem('role') == 'admin') {
    this.menuList = this.menuService.getMenuList();

    this.rountPath = '/admin/'

    console.log('Role top >>>>' +this.rountPath);

  }else {
    this.menuList = this.menuService.getMenuListUser();

    this.rountPath = '/user/'

    console.log('Role >>>>>  ' +this.rountPath);
    
  }
}



  openedSide() {
    if (this.isHandset)
      this.sidenav.toggle()
  }
  selectMenu(menuGroup: Menu) {
    if (this.menuGroupSelected === menuGroup.code) {
      this.menuGroupSelected = null;
      return;
    }
    this.menuGroupSelected = menuGroup.code;
  }

  signOut() {
    this.macApiService.signOut();
  }

  slackLink(){
    console.log('slackLink')
    window.open('slack://channel?team=T8M23SGFQ&id=C8L3ZDNUB')
    setTimeout(function(){window.open('https://app.slack.com/client/T8M23SGFQ/C8L3ZDNUB', '_blank')}, 1000);
  }

  webSlack(){

  }
  test() {
    console.log("hhh");
  }
}
