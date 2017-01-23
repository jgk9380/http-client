import { Injectable } from '@angular/core';
import {BrowserXhr} from "@angular/http";


@Injectable()
export class CorsBrowserXhr extends BrowserXhr {
  constructor() {
    super();
  }

  build(): any {
    let xhr:XMLHttpRequest = super.build();
    xhr.withCredentials = true;
    return <any>(xhr);
  }
}
