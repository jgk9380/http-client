import {Component, OnInit} from '@angular/core';
import {SystemService} from "../base/system.service";
import {SystemUser} from "../base/SystemUser";

@Component({
  moduleId:'module.id',
  selector: 'http-client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userId: string;
  pwd: string;
  loginUser: SystemUser;

  constructor(private ls: SystemService) {
  }

  ngOnInit() {
  }

  login() {
    if (this.ls.login(this.userId, this.pwd))
      this.loginUser = this.ls.loginUser;
      //如果成功，保存用户名，密码。以便下次登录使用免输密码。
    else
      //console.log("登录失败");界面提示登录失败
      ;
  };

  loginOut() {
    this.loginUser = null;
    this.ls.loginOut();
  }

}
