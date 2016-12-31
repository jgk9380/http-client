import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ButtonModule} from 'primeng/primeng';


import { AppComponent } from './app.component';
import {DataTableModule,SharedModule} from 'primeng/primeng';

import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import { Num2chinesePipe } from './num2chinese.pipe'
@NgModule({
  declarations: [
    AppComponent,
    Num2chinesePipe
  ],
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
