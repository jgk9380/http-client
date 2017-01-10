import {Employee} from "./employee";
//系统登录用户
export class SystemUser {
  id:string;
  realName:string;
  loginDate:Date;

  emp:Employee;
  constructor(id:string){
    this.id=id;
  }
}
