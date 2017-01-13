/**
 * Created by jianggk on 2017/1/11.
 */
import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {MenuItem} from "primeng/components/common/api";
import {SystemService} from "../base/system.service";

@Component({
  moduleId: 'module.id',
  selector: 'hc-menu-bar',
  templateUrl: './MenuBar.component.html',
  styleUrls: ['./MenuBar.component.css']
})

export class NavBar implements OnInit {
  // menuShow: boolean;
  items: NavBarItem[]=[];

  constructor(private router: Router, private ss:SystemService) {
  }

  ngOnInit() {
    //this.items=this.ss.items;
    this.items.push(new NavBarItem("登录", "/login"));
    this.items.push(new NavBarItem("存量", "/stock"));
    this.items.push(new NavBarItem("报表", "/test1"));
    this.items.push(new NavBarItem("测试1", "/test1"));
    this.items.push(new NavBarItem("测试2", "/test2"));
    // console.log("items.len="+this.items.length);
  }

  click(nbi: NavBarItem) {
    console.log("click on " + nbi.title + "  link = " + nbi.link)
    if(this.ss.currentNavBarItem)
      this.ss.currentNavBarItem.isCurrent=false;
    nbi.isCurrent=true;
    this.ss.currentNavBarItem=nbi;
    this.router.navigate([nbi.link]);
  }

  isCurrent(nbi:NavBarItem):boolean{
       return (nbi&&nbi.isCurrent);
  }

}


export class NavBarItem {
  title: string;
  link: string;
  leftMenu:MenuItem[];
  isCurrent:boolean;

  constructor(title: string, link: string) {
    this.title = title;
    this.link = link;
  }

}
