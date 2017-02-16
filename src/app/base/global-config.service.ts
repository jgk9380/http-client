import {Injectable} from '@angular/core';
import {Message} from "primeng/components/common/api";

@Injectable()
export class GlobalService {
  public baseUrl: string = "http://127.0.0.1:1274/";
  msgs: Message[] = [];
  constructor() {

  }
  showInfoMsg(msg:string,summary:string,severity:string) {
    this.msgs.push({severity:severity, summary:summary, detail:msg});
  }

  handleError(error: any) {
    let msg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'unknown error';
    console.error("err.msg=" + msg); // log to console instead
    return Promise.reject(false);
  }
}
