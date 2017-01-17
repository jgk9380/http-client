/**
 * Created by jianggk on 2017/1/11.
 */
import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {MenuItem} from "primeng/components/common/api";
import {SystemService} from "../base/System.service";
import {NavBarItem, MenuService} from "./menu.service";

@Component({
  moduleId: 'module.id',
  selector: 'hc-menu-bar',
  templateUrl: './MenuBar.component.html',
  styleUrls: ['./MenuBar.component.css']
})

export class NavBar implements OnInit {
  // menuShow: boolean;


  constructor(private router: Router, private ss:SystemService,public  ms:MenuService) {
  }

  ngOnInit() {

    // console.log("items.len="+this.items.length);
  }

}

