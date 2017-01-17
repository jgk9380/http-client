import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ButtonModule} from 'primeng/primeng';


import { StockComponent } from './Stock/stock.component';
import {DataTableModule,SharedModule} from 'primeng/primeng';

import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import { Num2chinesePipe } from './base/num2chinese.pipe';
import { LoginComponent } from './login/login.component'
import {SystemService} from "./base/System.service";
import { FrameComponent } from './frame/frame.component';
import {AppRoutingModule} from "./routing.module";
import {NavBar} from "./frame/MenuBar.component";
import {MenuModule,PanelMenuModule,MenuItem} from 'primeng/primeng';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import {MenuComponent} from "./frame/Menu.component";
import {MenuService} from "./frame/menu.service";
import { MainComponent } from './main/main.component';
import {DialogModule} from 'primeng/primeng';
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
    DialogModule
  ],
  declarations: [
    LoginComponent,
    StockComponent,
    Num2chinesePipe,
    FrameComponent,
    NavBar,
    Test1Component,
    Test2Component,
    MenuComponent,
    MainComponent,
  ],
  providers: [SystemService,MenuService],
  bootstrap: [FrameComponent]
})
export class AppModule { }
