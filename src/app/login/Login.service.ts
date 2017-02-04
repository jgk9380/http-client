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

  defaultUrl: string = "/stock";

  constructor(private  router: Router, private http: Http, private gc: GlobalConfig) {

  }

  login(loginId: string, pwd: string): Promise<boolean> {
    let a = <AuthenticatedHttpService> this.http;
     a.setLoginUser(null);
    let auth = 'Basic ' + btoa(loginId + ':' + pwd);
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Accept', "application/json");
    console.log(`auth=${auth}`);
    headers.append('Authorization', auth);
    //headers.append("Access-Control-Allow-Origin", "*");
    let login_url = this.gc.baseUrl + 'login' + "/" + loginId + "/" + pwd;
   return  this.http.get(login_url, {headers: headers})
      .toPromise().then(response => {
          console.log("res.result=" + response.json().result + "   bool= " + (response.json().result === 1))
          if (response.json().result === 1) {
            console.log("登录成功");
            a.setLoginUser({loginId: loginId, loginPwd: pwd});
            return true;//sucess=true
          } else {
            console.log("登录失败，原因：" + response.json().msg)
            return false;
          }
        }
      ).catch((x: any) => {
       console.log("登录失败");
        this.handleError(x);

        return false;
      });

  }

    test(){

      let headers = new Headers({'Content-Type': 'application/json'});
      //headers.append("Access-Control-Allow-Origin", "*");
      let temp_url = this.gc.baseUrl + "currentUser";
      let xxres = this.http.get(temp_url).toPromise().then(response => {
        console.log("test.res.result=" + JSON.stringify(response))
      }).catch(errorHandler);
    }

  loginOut(): Promise < boolean > {
    //TODO 添加注销逻辑 ,注销成功过后
    let a = <AuthenticatedHttpService> this.http;
    a.setLoginUser(null)
    return Promise.resolve(true);
  }


  getPrincipal(): Promise < string > {
    let principal_url = this.gc.baseUrl + "/currentUser";
    return this.http.get(principal_url)
      .toPromise()
      .then(function (response: Response) {
        return response.json().principal.name;
      })
      .catch(this.handleError);
  }

  private  handleError(error: any) {
    let msg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'unknown error';
    console.error("err.msg=" + msg); // log to console instead
    //console.error("error.msg=" + JSON.stringify(error))
    let a = <AuthenticatedHttpService> this.http;
    a.setLoginUser(null);
    //return Promise.reject(msg);
    return Promise.reject(false);
  }
}
