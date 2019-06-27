import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceUserService {

  constructor() { }


  getMenuList() {
    const menuList: MenuItemUser[] = [
      {
        group: { code: 'menu-view-user', name: 'Menu User Test' , icon: 'fas fa-file-medical' },
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


export interface MenuItemUser {
  group: MenuUser;
  menus: MenuUser[];
}

export interface MenuUser {
  code: string;
  name: string;
  icon: string;
}
