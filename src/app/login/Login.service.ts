import {Injectable, OnInit} from '@angular/core';
import {SystemUser} from "../base/system-user";
import {Router} from "@angular/router";
import {Http, Headers, Response} from "@angular/http";
import {GlobalConfig} from "../base/global-config.service";
import {AuthenticatedHttpService} from "../base/AuthenticatedHttpService";
import {errorHandler} from "@angular/platform-browser/src/browser";


@Injectable()
//全局服务，一个应用只有一个
export class LoginService {
  private loginUser: SystemUser;//如果不为空表示已登录，每次请求需附带登录信息
  constructor( ) {
  }

  setLoginUser(loginUser: SystemUser) {
    this.loginUser = loginUser;
  }

  getLoginUser(): SystemUser {
    return this.loginUser;
  }

  loginOut(): Promise < boolean > {
    //TODO 添加注销逻辑 ,注销成功过后
    this.setLoginUser(null)

    return Promise.resolve(true);
  }

}
