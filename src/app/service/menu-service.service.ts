import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  constructor() { }

  getMenuList() {
    const menuList: MenuItem[] = [
      {
        group: { code: 'menu-view-admin', name: 'View Admin', icon: 'far fa-list-alt'},
        menus: []
      },
      {
        group: { code: 'menu-add-device', name: 'Add Device', icon: 'fas fa-file-medical'},
        menus: []
      },
      {
        group: { code: 'menu-view-history', name: 'History', icon: 'fas fa-history'},
        menus: []
      },

    ];
    return menuList;
  }

  getMenuListUser() {
    const menuList: MenuItem[] = [
      {
        group: { code: 'menu-view-user', name: 'Menu User Test', icon: 'fas fa-file-medical' },
        menus: []
      }
    ];
    return menuList;
  }


  getSubMenuName(menuCode: string) {
    const menuList = this.getMenuList();
    for (const group of menuList) {
      for (const menu of group.menus) {
        return ` > ${menu.name}`;
      }
    }
    return '';
  }
}


export interface MenuItem {
  group: Menu;
  menus: Menu[];
}

export interface Menu {
  code: string;
  name: string;
  icon: string;
}
