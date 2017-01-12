import {Injectable} from '@angular/core';
import {SystemUser} from "./SystemUser";


@Injectable()
//全局服务，一个应用只有一个
export class SystemService {

  loginUser: SystemUser;

  constructor() {

  }

  login(userId: string, pwd: string): Promise<boolean> {
    //TODO 添加登录逻辑,保存本地。下次登录可以读取这里的信息
    //loginUser

    this.loginUser=new SystemUser(userId);
    return Promise.resolve(true);
  }

  loginOut(): Promise<boolean> {
    //TODO 添加注销逻辑 ,注销成功过后
    this.loginUser = null;
    return Promise.resolve(true);
  }

  isLogined(): boolean {
    if (this.loginUser) return true;
    else return false;
  }

}
