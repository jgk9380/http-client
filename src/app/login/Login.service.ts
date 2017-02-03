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
  public loginUser: SystemUser;
  defaultUrl: string = "/stock";

  constructor(private  router: Router, private http: Http, private gc: GlobalConfig) {
    this.login_url = gc.baseUrl + 'login';
    //this.login_url="http://127.0.0.1:1274/StockPromotion/byTele/13003480206";
    this.principal_url = gc.baseUrl + 'user';
    this.users_url = gc.baseUrl + "user-service/users";
  }

  login(loginId: string, pwd: string): Promise<boolean> {

    let auth = 'Basic ' + btoa(loginId + ':' + pwd);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', "application/json");
    headers.append('Authorization', auth);
    this.login_url = this.gc.baseUrl + 'login' + "/" + loginId + "/" + pwd;
    console.log("auth=" + this.login_url);
    return this.http.get(this.login_url, {headers: headers})
      .toPromise().then(response=> {
          console.log("res.result="+response.json().result+"   bool= "+(response.json().result === 1))
          if (response.json().result === 1) {
            console.log("登录成功1");
            this.loginUser={loginId:loginId,loginPwd:pwd};
            return 'success';//sucess=true
          }else{
            console.log("登录失败，原因："+response.json().msg )
            return false;
          }
        }
      ).catch(this.handleError);
  }

  loginOut(): Promise < boolean > {
    //TODO 添加注销逻辑 ,注销成功过后
    this.loginUser = null;
    return Promise.resolve(true);
  }

  isLogined(): boolean {
    if (this.loginUser) return true;
    else return false;
  }

  getPrincipal(): Promise < string > {
    return this.http.get(this.principal_url)
      .toPromise()
      .then(function (response: Response) {
        return response.json().principal.name;
      })
      .catch(this.handleError);
  }

  private
  handleError(error: any) {
    let msg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'unknown error';
    console.error("err.msg=" + msg); // log to console instead
    //console.error("error.msg=" + JSON.stringify(error))
    this.loginUser = null;
    //return Promise.reject(msg);
    return Promise.reject(false);
  }
}
