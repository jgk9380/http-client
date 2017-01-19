import {Injectable} from '@angular/core';
import {Router} from "@angular/router";


@Injectable()
export class MenuService {
  nbiItems: NavBarItem[] = [];//横菜单
  lastNbi:NavBarItem[]=[];
  currentNbi: NavBarItem;//及左菜单
  lastMenuItem:MenuItem[]=[];
  currentMenuItem: MenuItem;

  constructor(private router: Router) {
    this.currentNbi = this.getLoginNbiItem();
    this.currentNbi.isSelected=true;

    this.nbiItems.push(this.currentNbi);
    this.nbiItems.push(this.getStockNbiItem());
    this.nbiItems.push(this.getReportNbiItem());
  }

  getCurrentNavBarItem(): NavBarItem[] {
      return this.nbiItems;
  }

  expanded(mi: MenuItem) {
    mi.expanded = !mi.expanded;
  }

  click(mi: MenuItem) {
    if (this.currentMenuItem) {
      this.currentMenuItem.isSelected = false;
      this.lastMenuItem.push(this.currentMenuItem);
    }
    this.currentMenuItem = mi;
    mi.isSelected = true;

    if (mi.routerLink) {
      this.router.navigate([mi.routerLink]);
      console.log("menu:"+this.currentMenuItem.label + " isSelected and navigate  to link=" + this.currentMenuItem.routerLink);
    }
    else {
      console.log("menu:"+this.currentMenuItem.label + " isSelected and no  link=");
    }
    console.log("selected="+mi.isSelected)
  }

  clickBarItem(nbi: NavBarItem) {
    console.log("click on navBar:" + nbi.title + "  links = " + nbi.link)
    if(this.currentNbi) {
      this.currentNbi.isSelected = false;
      this.lastNbi.push(this.currentNbi);
    }
    nbi.isSelected=true;
    this.currentNbi=nbi;
    this.router.navigate([nbi.link]);
  }
  goBack(){
    if(this.currentNbi)
      this.currentNbi.isSelected=false;
    this.currentNbi=this.lastNbi.pop();
    this.currentNbi.isSelected=true;
    this.router.navigate([this.currentNbi.link]);//退回到上一个barItem；
  }

  getLoginNbiItem() {
    let loginBarItem = new NavBarItem("登录", "/login");
    let items = [{
      label: 'File',
      expanded: true,
      items: [
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
      {label: 'save', routerLink: "/test2"},
    ];
    loginBarItem.childMenu = items;
    return loginBarItem;
  }

  getStockNbiItem() {
    let stockBarItem = new NavBarItem("存量", "/stock");
    let items = [{
      //是不是要重新命名一个新的？
      label: 'File1',
      expanded: true,
      items: [
        {label: 'New1', icon: 'fa-plus'},
        {label: 'Open1', icon: 'fa-download'}
      ]
    },
      {
        label: 'Edit1',
        items: [
          {label: 'Undo1', icon: 'fa-refresh', disabled: true},
          {label: 'Redo1', icon: 'fa-repeat', disabled: true},
          {label: 'New1', icon: 'fa-plus', disabled: true},
        ]
      },
      {label: 'save1', routerLink: "/test2"},
    ];
    stockBarItem.childMenu = items;
    return stockBarItem
  }

  getReportNbiItem() {
    let reportBarItem = new NavBarItem("报表", "/test1")
    let items = [{
      //是不是要重新命名一个新的？
      label: 'File11',
      expanded: true,
      items: [
        {label: 'New11', icon: 'fa-plus'},
        {label: 'Open11', icon: 'fa-download'}
      ]
    },
      {
        label: 'Edit11',
        items: [
          {label: 'Undo11', icon: 'fa-refresh', disabled: true},
          {label: 'Redo11', icon: 'fa-repeat', disabled: true},
          {label: 'New11', icon: 'fa-plus', disabled: true},
        ]
      },
      {label: 'save11', routerLink: "/test2"},
    ];
    reportBarItem.childMenu = items;
    return reportBarItem;
  }
}



export class NavBarItem {
  title: string;
  link: string;
  childMenu: MenuItem[];
  isSelected: boolean=false;

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
  isSelected?: boolean = false;
}
