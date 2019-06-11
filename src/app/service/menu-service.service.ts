import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  constructor() { }

  getMenuList() {
    const menuList: MenuItem[] = [
      // {
      //   group: { code: 'menu1', name: 'Menu 1' },
      //   menus: [
      //     { code: 'subMenu1', name: 'Sub Menu 1' },
      //     { code: 'subMenu2', name: 'Sub Menu 2' },
      //     { code: 'subMenu3', name: 'Sub Menu 3' }
      //   ]
      // },
      // {
      //   group: { code: 'menu2', name: 'Menu 2' },
      //   menus: [
      //     { code: 'subMenu1', name: 'Sub Menu 1' },
      //     { code: 'subMenu2', name: 'Sub Menu 2' },
      //     { code: 'subMenu3', name: 'Sub Menu 3' }
      //   ]
      // },
      // {
      //   group: { code: 'menu3', name: 'Menu 3' },
      //   menus: [
      //     { code: 'subMenu1', name: 'Sub Menu 1' },
      //     { code: 'subMenu2', name: 'Sub Menu 2' },
      //     { code: 'subMenu3', name: 'Sub Menu 3' }
      //   ]
      // },
      {
        group: { code: 'menu-add-device', name: 'Add device' },
        menus: []
      },
      {
        group: { code: 'menu-view-admin', name: 'View admin' },
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
}
