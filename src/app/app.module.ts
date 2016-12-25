import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ButtonModule} from 'primeng/primeng';


import { AppComponent } from './app.component';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {CarService} from "./CarService";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    DataTableModule,
    SharedModule
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
