import {Component, OnInit} from '@angular/core';
import {LoginService} from "./Login.service";
import {Router} from "@angular/router";
import {GlobalConfig} from "../base/global-config.service";
import any = jasmine.any;
import {Http, Headers, Response} from "@angular/http";

@Component({
  moduleId: 'module.id',
  selector: 'http-client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public userId: string;
  public pwd: string;
  rememberMe: boolean = true;
  loginResult:boolean;

  constructor(private ls: LoginService, private router: Router, public http: Http, private gc: GlobalConfig) {
  }
  ngOnInit() {
    //读取上次登录成功保存本地的用户名和密码。
    if (localStorage["userId"]) {
      this.userId = localStorage["userId"];
    }
    if (localStorage["pwd"]) {
      this.pwd = localStorage["pwd"];
    }
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
            this.router.navigate(["/"])
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


  test() {
    let headers = new Headers({'Content-Type': 'application/json'});
    //headers.append("Access-Control-Allow-Origin", "*");
    let temp_url = this.gc.baseUrl + "currentUser";
    let xxres = this.http.get(temp_url).toPromise().then(response => {
      console.log("test.res.result=" + JSON.stringify(response))
    }).catch((x: any) => this.handleError(x));
  }

  private  handleError(error: any) {
    let msg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'unknown error';
    console.error("err.msg=" + msg); // log to console instead
    this.ls.setLoginUser(null);
    return Promise.reject(false);
  }

  cancel() {
    //返回到上一个链接
    this.router.navigate(["/stock"]);
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
  // loginOut(){
  //   this.router.navigate(["/"]);
  //   return this.ls.loginOut();
  // }
}


// {
//   "authenticated":  true,
// }
