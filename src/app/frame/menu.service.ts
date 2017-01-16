import { Injectable } from '@angular/core';
import {Router} from "@angular/router";


@Injectable()
export class MenuService {
  private  nbiItems: NavBarItem[]=[];
  currentNbi:NavBarItem;
  currentMenuItem:MenuItem;

  constructor(private router: Router) {
    this.nbiItems.push(new NavBarItem("登录", "/login"));
    this.nbiItems.push(new NavBarItem("存量", "/stock"));
    this.nbiItems.push(new NavBarItem("报表", "/test1"));
    this.nbiItems.push(new NavBarItem("测试1", "/test1"));
    this.nbiItems.push(new NavBarItem("测试2", "/test2"));
  }

  isCurrentNbiItem(nbiItem:NavBarItem){

  }
  isCurrentMenuItem(mi:MenuItem):boolean{
    return
  }
 getCurrentNavBarItem():NavBarItem[]{
    return this.nbiItems;
 }
  navigate(mi: MenuItem) {
    if (this.currentMenuItem)
      this.currentMenuItem.isSelected = false;
    this.currentMenuItem = mi;
    mi.isSelected = true;

    if (mi.routerLink) {
      this.router.navigate([mi.routerLink]);
      console.log(this.currentMenuItem.label + " isSelected and navigate  to link=" + this.currentMenuItem.routerLink);
    }
    else {
      console.log(this.currentMenuItem.label + " isSelected and no  link=");
    }
  }
}



export class NavBarItem {
  title: string;
  link: string;
  childMenu:MenuItem[];
  isSelect:boolean;

  constructor(title: string, link: string) {
    this.title = title;
    this.link = link;
  }

}



export class MenuItem {
  label: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  //eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  isSelected?: boolean=false;
}
