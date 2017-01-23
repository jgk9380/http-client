import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConfig {
  public  baseUrl: string = "http://127.0.0.1:1274/";
  constructor() { }

}
