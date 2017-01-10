import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ButtonModule} from 'primeng/primeng';


import { StockComponent } from './StockPromotion/stock.component';
import {DataTableModule,SharedModule} from 'primeng/primeng';

import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import { Num2chinesePipe } from './base/num2chinese.pipe';
import { LoginComponent } from './login/login.component'
import {LoginService} from "./login/login.service";
import { AppComponent } from './app/app.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    DataTableModule,
    SharedModule,
    MessagesModule,
    GrowlModule
  ],
  declarations: [
    LoginComponent,
    StockComponent,
    Num2chinesePipe,
    AppComponent,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
