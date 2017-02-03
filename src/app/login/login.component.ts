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
    //读取上次登录成功保存本地的用户名和密码。
    if (localStorage["userId"]) {
      this.userId = localStorage["userId"];
    }
    if (localStorage["pwd"]) {
      this.pwd = localStorage["pwd"];
    }
  }

  login() {
    console.log("userId=" + this.userId + "  pwd=" + this.pwd + "  rememberMe=" + this.rememberMe);
    let res = this.ss.login(this.userId, this.pwd);
    console.log(`res=${JSON.stringify(res)}`);
    res.then(x=>{
      console.log("组件成功");
      if (this.rememberMe) {
        //登录成功,保存本地。下次登录可以读取这里的信息
        localStorage["userId"] = this.userId;
        localStorage["pwd"] = this.pwd;
      }
      //TODO 定向到默认路由或登录前的路由。
      this.router.navigate(["/stock"]);
    });
  }



    cancel()
    {
      //返回到上一个链接
      this.router.navigate(["/stock"]);
    }

    loginOut()
    {
      this.ss.loginOut();
    }

  }

//
// export class LoginInfo{
//   public userId: string="";
//   public pwd: string="";
//   public rememberMe:boolean=true;
// }
