/**
 * Created by jianggk on 2017/1/11.
 */

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem} from "primeng/components/common/api";

@Component({
  moduleId: 'module.id',
  selector: 'hc-menu-pad',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  // menuShow: boolean;

  constructor(private router: Router) {
  }
  private items: MenuItem[];
  ngOnInit() {
    this.items = [{
      label: 'File',
      items: [
        {label: 'New', icon: 'fa-plus'},
        {label: 'Open', icon: 'fa-download'}
      ]
    },
      {
        label: 'Edit',
        items: [
          {label: 'Undo', icon: 'fa-refresh'},
          {label: 'Redo', icon: 'fa-repeat'}
        ]
      }];
  }
}


