import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login/Login.service";
import {Http, Headers, Response} from "@angular/http";
import {Router} from "@angular/router";
import {GlobalConfig} from "../base/global-config.service";
import {getResponseURL} from "@angular/http/src/http_utils";

@Component({
  selector: 'hc-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  menuShow: boolean = true;
  adsShow: boolean = false;

  public userId: string;
  public pwd: string;
  rememberMe: boolean = false;
  infoResult: string;

  constructor(public ls: LoginService, public http: Http, private router: Router, private gc: GlobalConfig) {
  }

  ngOnInit() {
    if (localStorage["userId"]) {
      this.userId = localStorage["userId"];
    }
    if (localStorage["pwd"]) {
      this.pwd = localStorage["pwd"];
    }
  }

  menuToggle() {
    console.log("toggle menu");
    this.menuShow = !this.menuShow;
  }

  login(): Promise<boolean> {
    let auth = 'Basic ' + btoa(this.userId + ':' + this.pwd);
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Accept', "application/json");
    console.log(`auth=${auth}`);
    headers.append('Authorization', auth);
    //headers.append("Access-Control-Allow-Origin", "*");
    let login_url = this.gc.baseUrl + 'users/currentUser';
    return this.http.get(login_url, {headers: headers})
      .toPromise().then(response => {
          console.log("res.result=" + response.json().result + "   bool= " + (response.json().result === 1) + "  result=" + response.json().result)
          if (response.json().authenticated) {
            console.info("登录成功");
            if (this.rememberMe) {
              localStorage["userId"] = this.userId;
              localStorage["pwd"] = this.pwd;
            }
            this.ls.setLoginUser({loginId: this.userId, loginPwd: this.pwd});
            this.infoResult = null;
            return true;
          } else {
            console.error("登录失败,没有取到登录用户信息，result：" + response.json().msg + " " + JSON.stringify(response.json()))
            this.infoResult = "用户名或密码错";
            return false;
          }
        }
      ).catch((x: any) => {
        console.error("登录失败");
        let headers = new Headers({'Content-Type': 'application/json'});
        let valid_url = this.gc.baseUrl + 'users/valid/' + this.userId + "/" + this.pwd;
        this.http.get(valid_url, {headers: headers})
          .toPromise().then(response => {
            this.infoResult = response.json().msg;
          }
        ).catch((y: any) => this.handleError(y))
        this.handleError(x);
        return false;
      });
  }

  queryPwd(): Promise<boolean> {
    let auth = 'Basic ' + btoa(this.userId + ':' + this.pwd);
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Accept', "application/json");
    //headers.append("Access-Control-Allow-Origin", "*");
    let query_url = this.gc.baseUrl + 'users/queryPwd/' + this.userId;
    return this.http.get(query_url, {headers: headers})
      .toPromise().then(response => {
        this.infoResult = response.json().msg;
      }).catch((x: any) => {
        this.handleError(x);
      });
  }

  getPrincipal(): Promise < string > {
    let principal_url = this.gc.baseUrl + "/users/currentUser";
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
    this.ls.setLoginUser(null);
    return Promise.reject(false);
  }
}
