/**
 * Created by jianggk on 2017/1/11.
 */

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem, MenuService} from "./menu.service";

@Component({
  moduleId: 'module.id',
  selector: 'hc-menu-pad',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  // menuShow: boolean;


  constructor(private router: Router,private  ms:MenuService) {
  }



  ngOnInit() {
  }



}

