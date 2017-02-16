/**
 * Created by jianggk on 2017/1/24.
 */
import {Injectable} from '@angular/core';
import {Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {LoginService} from "./Login.service";
import {SystemUser} from "./system-user";
import {isType} from "@angular/core/src/type";


@Injectable()
export class AuthenticatedHttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions,public ls:LoginService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    console.log(`url=${JSON.stringify(url)}`);
    if (url instanceof Request) {
      if (this.ls.getLoginUser()) {
        let urlRequest = <Request> url;
        console.log("已登录");
        let auth = 'Basic ' + btoa(this.ls.getLoginUser().loginId + ':' + this.ls.getLoginUser().loginPwd);
        console.log(`auth=${auth}`);
        if (!urlRequest.headers)
          urlRequest.headers = new Headers({'Content-Type': 'application/json'});
        urlRequest.headers.append('Accept', "application/json");
        urlRequest.headers.append('Authorization', auth);
      }
    } else {
      if (!options)
        options = {};
      if (this.ls.getLoginUser()) {
        let auth = 'Basic ' + btoa(this.ls.getLoginUser().loginId + ':' + this.ls.getLoginUser().loginPwd);
        if (!options.headers)
          options.headers = new Headers({'Content-Type': 'application/json'});
        console.log(`----in true  auth=${auth}`);
        options.headers.append('Accept', "application/json");
        options.headers.append('Authorization', auth);
      }
    }

    return super.request(url, options).catch((error: Response) => {
      console.log('----------error--------');
      if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
        console.log('----------The authentication session expires or the user is not authorised. Force refresh of the current page.--------');
        window.location.href = window.location.href + '?' + new Date().getMilliseconds();
      }
      return Observable.throw(error);
    });
  }
}
