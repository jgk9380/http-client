import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login/Login.service";
import {Http, Headers, Response} from "@angular/http";
import {Router} from "@angular/router";
import {GlobalConfig} from "../base/global-config.service";

@Component({
  selector: 'hc-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  menuShow: boolean = true;
  adsShow: boolean = false;
  display: boolean = false;

  public userId: string;
  public pwd: string;
  rememberMe: boolean = false;
  loginResult:boolean;

  constructor(public ls:LoginService,public http:Http, private router: Router , private gc: GlobalConfig) {
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

  showLogin() {
    this.display = true;
  }
  closeLogin(){
    this.display = false;
  }

  private  handleError(error: any) {
    let msg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'unknown error';
    console.error("err.msg=" + msg); // log to console instead
    this.ls.setLoginUser(null);
    return Promise.reject(false);
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
            console.log("登录成功");
            this.ls.setLoginUser({loginId: this.userId, loginPwd: this.pwd});
            //this.router.navigate(["/"])
            return true;//sucess=true
          } else {
            console.log("登录失败，原因：" + response.json().msg + " " + JSON.stringify(response.json()))
            this.loginResult=true;
            return false;
          }
        }
      ).catch((x: any) => {
        console.log("登录失败");
        this.loginResult=true;
        this.handleError(x);
        return false;
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
}
