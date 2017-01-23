import {Injectable, OnInit} from '@angular/core';
import {SystemUser} from "../base/system-user";
import {Router} from "@angular/router";
import {Http, Headers, Response} from "@angular/http";
import {GlobalConfig} from "../base/global-config.service";


@Injectable()
//全局服务，一个应用只有一个
export class LoginService {
  //private baseUrl: string = "http://127.0.0.1:1274/";
  private login_url: string;// = this.baseUrl+'login'
  private principal_url: string;// = this.baseUrl+'user'
  private users_url: string; //= this.baseUrl+'user-service/users'
  loginUser?: SystemUser;
  defaultUrl: string = "/stock";

  constructor(private  router: Router, private http: Http, gc: GlobalConfig) {
    this.login_url = gc.baseUrl + 'login';
    this.principal_url = gc.baseUrl + 'user';
    this.users_url = gc.baseUrl + "user-service/users";
  }

  login(loginId: string, pwd: string): Promise<boolean> {
    //TODO 添加登录逻辑,保存本地。下次登录可以读取这里的信息
    //loginUser
    //let headers = new Headers({ authorization: 'Basic ' + btoa(user.username + ':' + user.password) });
    let auth = 'Basic ' + btoa(loginId + ':' + pwd);
    let headers = new Headers();
    headers.append('Authorization', auth);
    return this.http.get(this.login_url, {headers: headers})
      .toPromise()
      .then(function (response: Response) {
        this.loginUser = new SystemUser();
        this.loginUser.loginId = loginId;
        this.loginUser.loginPwd = pwd;
        this.loginUser.loginDate = new Date();
        console.log("response="+JSON.stringify(response));
        console.log("response.json="+JSON.stringify(response.json()));
        console.log("loginUser="+JSON.stringify(this.loginUser));
        return 'success';//sucess=true
      })
      .catch(this.handleError);
    //return Promise.resolve(true);
  }

  loginOut(): Promise<boolean> {
    //TODO 添加注销逻辑 ,注销成功过后
    this.loginUser = null;
    return Promise.resolve(true);
  }

  isLogined(): boolean {
    if (this.loginUser) return true;
    else return false;
  }

  getPrincipal(): Promise<string> {
    return this.http.get(this.principal_url)
      .toPromise()
      .then(function (response: Response) {
        return response.json().principal.name;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let msg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'unknown error';
    console.error("err.msg="+msg); // log to console instead
    console.error("error.msg="+JSON.stringify(error))
    this.loginUser = null;
    //return Promise.reject(msg);
    return Promise.reject(false);
  }
}
