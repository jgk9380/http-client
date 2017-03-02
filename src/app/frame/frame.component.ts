import {Component, OnInit} from '@angular/core';
import {LoginService} from "../base/Login.service";
import {Http, Headers, Response} from "@angular/http";
import {Router} from "@angular/router";
import {GlobalService} from "../base/global-config.service";
import {getResponseURL} from "@angular/http/src/http_utils";
import {Employee} from "../base/employee";

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
  info: string;
  newPwd1: string;
  newPwd2: string;
  showEditPwd=false;
  constructor(public ls: LoginService, public http: Http, private router: Router, private gc: GlobalService) {
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
loginOut(){
    this.pwd=null;
    this.ls.loginOut();
    this.info=null;
}
  login(): Promise<boolean> {
    this.ls.setLoginUser(null);
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
            this.ls.setLoginUser({loginId: this.userId, loginPwd: this.pwd,loginDate:new Date()});
            let emp_url=this.gc.baseUrl+"emps/byLoginId/"+this.userId;
            this.http.get(emp_url,headers).toPromise().then(reponse=>{
              console.info("返回员工信息："+JSON.stringify(reponse));
              let employee:Employee=new Employee();
              employee.id=reponse.json().id;
              employee.name=reponse.json().name;
              employee.tele=reponse.json().tele;
              employee.depart=reponse.json().depart;
              this.ls.getLoginUser().loginEmp=employee;
              console.info(JSON.stringify(employee));
              console.info(JSON.stringify( this.ls.getLoginUser().loginEmp.depart.name));
            });
            //this.info = null;
            return true;
          } else {
            console.error("登录失败,没有取到登录用户信息，result：" + response.json().msg + " " + JSON.stringify(response.json()))
            this.info = "用户名或密码错";
            return false;
          }
        }
      ).catch((x: any) => {
        console.error("登录失败");
        let headers = new Headers({'Content-Type': 'application/json'});
        let valid_url = this.gc.baseUrl + 'users/valid/' + this.userId + "/" + this.pwd;
        this.http.get(valid_url, {headers: headers})
          .toPromise().then(response => {
            this.info = response.json().msg;
          }
        ).catch((y: any) => this.gc.handleError(y))
        this.ls.setLoginUser(null);
        this.gc.handleError(x);
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
        this.info = response.json().msg;
      }).catch((x: any) => {
        this.gc.handleError(x);
      });
  }


  editPwd() {
    if (!this.newPwd1 || !this.newPwd2) {
      this.info = "请填写密码";
      return;
    }
    if (this.newPwd1 == this.newPwd2) {
      let headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Accept', "application/json");
      let editPwdUrl=this.gc.baseUrl+"users/editPwd/"+this.ls.getLoginUser().loginId+"/"+this.newPwd1;
      this.http.post(editPwdUrl, {headers: headers}).toPromise()
        .then(response => {
          this.info=response.json().msg+",请重新登录！";
          //setTimeout(this.ls.setLoginUser(null),3000);
          this.ls.getLoginUser().loginPwd=this.newPwd1;
        }).catch((x:any)=>this.gc.handleError(x));
    } else {
      this.info = "密码不一致";
      return;
    }
  }


}
