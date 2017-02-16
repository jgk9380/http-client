import {Injectable} from '@angular/core';
import {Router} from "@angular/router";


@Injectable()
export class MenuService {
  nbiItems: NavBarItem[] = [];//横菜单
  lastNbi: NavBarItem[] = [];
  currentNbi: NavBarItem;//及左菜单
  lastMenuItem: MenuItem[] = [];
  currentMenuItem: MenuItem;

  constructor(private router: Router) {
    this.currentNbi = this.getLoginNbiItem();
    this.currentNbi.isSelected = true;

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
      console.log("menu:" + this.currentMenuItem.label + " isSelected and navigate  to link=" + this.currentMenuItem.routerLink);
    }
    else {
      console.log("menu:" + this.currentMenuItem.label + " isSelected and no  link=");
    }
    console.log("selected=" + mi.isSelected)
  }

  clickBarItem(nbi: NavBarItem) {
    console.log("click on navBar:" + nbi.title + "  links = " + nbi.link)
    if (this.currentNbi) {
      this.currentNbi.isSelected = false;
      this.lastNbi.push(this.currentNbi);
      //this.lastMenuItem. 清除
    }
    nbi.isSelected = true;
    this.currentNbi = nbi;
    this.router.navigate([nbi.link]);
  }

  goBack() {
    if (this.currentNbi)
      this.currentNbi.isSelected = false;
    this.currentNbi = this.lastNbi.pop();
    this.currentNbi.isSelected = true;
    this.router.navigate([this.currentNbi.link]);//退回到上一个barItem；
  }

  getLoginNbiItem() {
    let loginBarItem = new NavBarItem("系统管理", "/loginUserAdmin");
    let items = [{
      label: '基础数据',
      expanded: true,
      items: [
        {label: '登录工号', icon: 'fa-plus'},
        {label: '员工管理', icon: 'fa-plus',routerLink: "/empAdmin"},
        {label: '部门管理', icon: 'fa-plus'},
        {label: '权限管理', icon: 'fa-download'},
        {label: '系统日志', icon: 'fa-download'},
      ]
    },
      {
        label: '业务数据',
        items: [
          {label: '业务单元', icon: 'fa-refresh',},
          {label: '网格管理', icon: 'fa-refresh',},
          {label: '渠道管理', icon: 'fa-repeat',},
          {label: '指标管理', icon: 'fa-repeat',},
        ]
      },
      {
        label: '报表管理',
        items: [
          {label: '报表配置', icon: 'fa-refresh',},
          {label: '报表权限', icon: 'fa-repeat',},
          {label: '报表上传', icon: 'fa-repeat',},
        ]
      },
      {
        label: '指标管理',
        items: [
          {label: '指标查询', icon: 'fa-refresh',},
          {label: '指标管理', icon: 'fa-refresh',},
        ]
      },
    ];
    loginBarItem.childMenu = items;
    return loginBarItem;
  }

  getStockNbiItem() {
    let stockBarItem = new NavBarItem("报表查询", "/stock");
    let items = [{
      //是不是要重新命名一个新的？
      label: '规定动作',
      expanded: true,
      items: [
        {label: '手厅', icon: 'fa-plus'},
        {label: 'wo视频', icon: 'fa-download'},
        {label: '换卡', icon: 'fa-download'}
      ]
    },
      {
        label: '业务推广',
        items: [
          {label: '低消', icon: 'fa-refresh', disabled: true},
          {label: '大额流量', icon: 'fa-repeat', disabled: true},
          {label: '送终端', icon: 'fa-plus', disabled: true},
        ]
      },
    ];
    stockBarItem.childMenu = items;
    return stockBarItem
  }

  getReportNbiItem() {
    let reportBarItem = new NavBarItem("任务管理", null)
    let items = [
      {label: '待完成任务',routerLink: "/test2"},
      {label: '任务查询',routerLink: "/test2"},
    ];
    reportBarItem.childMenu = items;
    return reportBarItem;
  }
}


export class NavBarItem {
  title: string;
  link: string;
  childMenu: MenuItem[];
  isSelected: boolean = false;

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
