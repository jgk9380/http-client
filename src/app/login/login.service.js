"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SystemUser_1 = require("../base/SystemUser");
var LoginService = (function () {
    function LoginService() {
    }
    LoginService.prototype.login = function (userId, pwd) {
        //TODO 添加登录逻辑,保存本地。下次登录可以读取这里的信息
        //loginUser
        this.loginUser = new SystemUser_1.SystemUser(userId);
        return Promise.resolve(true);
    };
    LoginService.prototype.loginOut = function () {
        //TODO 添加注销逻辑 ,注销成功过后
        this.loginUser = null;
        return Promise.resolve(true);
    };
    LoginService.prototype.isLogined = function () {
        if (this.loginUser)
            return true;
        else
            return false;
    };
    LoginService = __decorate([
        core_1.Injectable()
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
