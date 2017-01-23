import {Component, OnInit} from '@angular/core';
import {LoginService} from "./Login.service";
import {Router} from "@angular/router";
import {GlobalConfig} from "../base/global-config.service";

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

  constructor(private ss: LoginService, private router: Router,) {
  }

  ngOnInit() {
    if (localStorage["userId"]) {
      this.userId = localStorage["userId"];
    }
    if (localStorage["pwd"]) {
      this.pwd = localStorage["pwd"];
    }
  }

  login() {
    console.log("userId=" + this.userId + "  pwd=" + this.pwd + "  rememberMe=" + this.rememberMe);
    let res=this.ss.login(this.userId, this.pwd);
    console.log(`res=${JSON.stringify(res)}`);
    if (res) {
      //如果成功，保存用户名，密码。以便下次登录使用免输密码。
      //如果导航url为空，导航到指定地址
      if (this.rememberMe) {
        localStorage["userId"] = this.userId;
        localStorage["pwd"] = this.userId;
      }
      this.router.navigate(["/stock"]);
    }
    else
      console.log("登录失败");//界面提示登录失败
  };
  cancel(){
    //返回到上一个链接
    this.router.navigate(["/stock"]);
  }
  loginOut() {
    this.ss.loginOut();
  }

}

//
// export class LoginInfo{
//   public userId: string="";
//   public pwd: string="";
//   public rememberMe:boolean=true;
// }
