import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Injectable} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, BrowserXhr, Http} from '@angular/http';
import {ButtonModule} from 'primeng/primeng';
import { StockComponent } from './Stock/stock.component';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import { Num2chinesePipe } from './base/num2chinese.pipe';
import {LoginService} from "./base/Login.service";
import { FrameComponent } from './frame/frame.component';
import {AppRoutingModule} from "./routing.module";
import {NavBar} from "./frame/menu-bar/MenuBar.component";
import {MenuModule,PanelMenuModule,MenuItem} from 'primeng/primeng';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import {MenuComponent} from "./frame/menu-bar/menu/Menu.component";
import {MenuService} from "./frame/menu.service";
import {DialogModule} from 'primeng/primeng';
import {GlobalService} from "./base/global-config.service";
import {AuthenticatedHttpService} from "./base/AuthenticatedHttpService";
import {CorsBrowserXhr} from "./base/cors-browser-xhr.service";

import {BaseAdminModule} from "./admin/base/base-admin.module";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    DataTableModule,
    SharedModule,
    MessagesModule,
    GrowlModule,
    AppRoutingModule,
    MenuModule,
    PanelMenuModule,
    DialogModule,
    BaseAdminModule
  ],
  declarations: [
    StockComponent,
    Num2chinesePipe,
    FrameComponent,
    NavBar,
    Test1Component,
    Test2Component,
    MenuComponent,
  ],
  providers: [
             { provide: BrowserXhr, useClass:CorsBrowserXhr },
             { provide: Http, useClass:AuthenticatedHttpService},
                LoginService,
                MenuService,
                GlobalService
              ],
  bootstrap: [FrameComponent]
})

export class AppModule { }



