/**
 * Created by jianggk on 2017/1/11.
 */
import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";

@Component({
  moduleId: 'module.id',
  selector: 'hc-menu-bar',
  templateUrl: './MenuBar.component.html',
  styleUrls: ['./MenuBar.component.css']
})

export class NavBar implements OnInit {
  // menuShow: boolean;
  items: NavBarItem[] = [];
  constructor(private router: Router,) {
  }

  ngOnInit() {
    this.items.push(new NavBarItem("登录", "/login"));
    this.items.push(new NavBarItem("存量", "/stock"))
    this.items.push(new NavBarItem("报表", "/test1"))
    this.items.push(new NavBarItem("测试1", "/test1"))
    this.items.push(new NavBarItem("测试2", "/test2"))
  }

  click(nbi: NavBarItem) {
    console.log("click on " + nbi.title + "  link = " + nbi.link)
    for (let nvi of this.items) {
      nvi.isCurrent = false;
    }
    nbi.isCurrent = true;
    this.router.navigate([nbi.link])
  }

}


export class NavBarItem {
  title: string;
  link: string;
  isCurrent: boolean;
  constructor(title: string, link: string) {
    this.title = title;
    this.link = link;
  }
}
