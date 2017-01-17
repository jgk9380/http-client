import {Component, OnInit} from '@angular/core';
import {SystemService} from "../base/System.service";

@Component({
  moduleId:'module.id',
  selector: 'http-client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public userId: string="";
  public pwd: string="";
  rememberMe:boolean;

  constructor(private ss: SystemService) {
  }

  ngOnInit() {

  }

  login() {
    console.log("userId="+this.userId+"  pwd="+this.pwd+"  rememberMe="+this.rememberMe);
    if (this.ss.login(this.userId, this.pwd,this.rememberMe))
      console.log("登录成功")
      //如果成功，保存用户名，密码。以便下次登录使用免输密码。
    else
      console.log("登录失败");//界面提示登录失败
  };

  loginOut() {
    this.ss.loginOut();
  }

}


export class LoginInfo{
  public userId: string="";
  public pwd: string="";
  public rememberMe:boolean=true;
}
