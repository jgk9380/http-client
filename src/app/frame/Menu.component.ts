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

  items: MenuItem[];

  ngOnInit() {
    this.items = [{
      label: 'File',
      expanded: true,
      items: [
        {label: 'New', icon: 'fa-plus'},
        {label: 'New', icon: 'fa-plus'},
        {label: 'New', icon: 'fa-plus'},
        {label: 'Open', icon: 'fa-download'}
      ]
    },
      {
        label: 'Edit',
        items: [
          {label: 'Undo', icon: 'fa-refresh'},
          {label: 'Redo', icon: 'fa-repeat'},
          {label: 'New', icon: 'fa-plus'},
        ]
      },
      {
        label: 'save',
        items: [
          {label: 'save1', icon: 'fa-refresh'},
          {label: 'save2', icon: 'fa-repeat',routerLink:"/test1"}
        ]
      },
      {label: 'save', routerLink: "/test2"},
    ];
  }

  expanded(mi: MenuItem) {
    mi.expanded = !mi.expanded;
  }
  navigate(mi: MenuItem) {
    this.router.navigate([mi.routerLink]);
  }
}


