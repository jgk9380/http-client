/**
 * Created by jianggk on 2017/1/11.
 */

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem} from "./menu.service";

@Component({
  moduleId: 'module.id',
  selector: 'hc-menu-pad',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  // menuShow: boolean;
  currentItem: MenuItem;

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
          {label: 'Undo', icon: 'fa-refresh', disabled: true},
          {label: 'Redo', icon: 'fa-repeat', disabled: true},
          {label: 'New', icon: 'fa-plus', disabled: true},
        ]
      },
      {
        label: 'save',
        items: [
          {label: 'save1', icon: 'fa-refresh'},
          {label: 'save2', icon: 'fa-repeat', routerLink: "/test1"}
        ]
      },
      {label: 'save', routerLink: "/test2"},
    ];
  }

  expanded(mi: MenuItem) {
    mi.expanded = !mi.expanded;
  }

  navigate(mi: MenuItem) {
    if (this.currentItem)
      this.currentItem.isSelected = false;
    this.currentItem = mi;
    mi.isSelected = true;

    if (mi.routerLink) {
      this.router.navigate([mi.routerLink]);
      console.log(this.currentItem.label + " isSelected and navigate  to link=" + this.currentItem.routerLink);
    }
    else {
      console.log(this.currentItem.label + " isSelected and no  link=");
    }
  }

}

