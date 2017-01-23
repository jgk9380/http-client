import {Employee} from "./employee";
//系统登录用户
export class SystemUser {
  loginId:string;
  loginPwd:String;
  loginDate:Date;
  loginEmp:Employee;
  rememberMe:boolean;
  constructor(){
  }
}
