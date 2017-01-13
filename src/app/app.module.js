"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var primeng_1 = require('primeng/primeng');
var stock_component_1 = require('./Stock/stock.component');
var primeng_2 = require('primeng/primeng');
var primeng_3 = require('primeng/primeng');
var primeng_4 = require('primeng/primeng');
var num2chinese_pipe_1 = require('./base/num2chinese.pipe');
var login_component_1 = require('./login/login.component');
var system_service_1 = require("./system.service");
var app_component_1 = require('./app/app.component');
var routing_module_1 = require("./routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                primeng_1.ButtonModule,
                primeng_2.DataTableModule,
                primeng_2.SharedModule,
                primeng_3.MessagesModule,
                primeng_4.GrowlModule,
                routing_module_1.AppRoutingModule
            ],
            declarations: [
                login_component_1.LoginComponent,
                stock_component_1.StockComponent,
                num2chinese_pipe_1.Num2chinesePipe,
                app_component_1.AppComponent,
            ],
            providers: [system_service_1.SystemService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;