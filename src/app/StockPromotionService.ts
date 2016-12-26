import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {StockPromotion} from "./StockPromotion";
import {stockPromotions} from "./stockPromotionList";
import 'rxjs/add/operator/toPromise';
@Injectable()
export class StockPromotionService {
  constructor(private http: Http) {
  }

  stockPromotionUrl: string = "http://127.0.0.1:8080/StockPromotion/byTele/";
  // getStockPromotion(tele:string) :Promise<StockPromotion[]>{
  //   // return new Promise<StockPromotion[]>(resolve =>
  //   //   setTimeout(resolve, 2000)) // delay 2 seconds
  //   //   .then(() => this.getCarsSmall());
  //   return Promise.resolve(stockPromotions);
  // }

  getStockPromotion(tele: string): Promise<StockPromotion[]> {

    let tempStockPromotionUrl:string = this.stockPromotionUrl + tele;
    console.info("url=" + tempStockPromotionUrl);
    return this.http.get(tempStockPromotionUrl)
      .toPromise()
      .then(response => {
        // console.log("res="+JSON.stringify(response));
        // console.log("res.json="+JSON.stringify(response.json()));
        // console.log("res.json.data="+response.json().data);
        return response.json() as StockPromotion[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}

//
// {
//   "_body"
// :
//   "[{\"id\":12,\"tele\":\"15695159855\",\"promotionName\":\"存费送机折扣合约\",\"remark\":\"1-2年档2-3G低端池,可办理机型：vivo Y51、vivo Y31A、vivo V3Max、乐视2实力版、中兴BA910、金立F103B(3G+16G)、魅蓝3,金立F100S、 金立大金刚,vivo Y55、 OPPO A59S\"},{\"id\":13,\"tele\":\"15695159855\",\"promotionName\":\"存费送机折扣合约\",\"remark\":\"1-2年档2-3G低端池,可办理机型：vivo Y51、vivo Y31A、vivo V3Max、乐视2实力版、中兴BA910、金立F103B(3G+16G)、魅蓝3,金立F100S、 金立大金刚,vivo Y55、 OPPO A59S\"}]",
//     "status"
// :
//   200, "ok"
// :
//   true, "statusText"
// :
//   "OK", "headers"
// :
//   {
//     "Pragma"
//   :
//     ["no-cache"], "Content-Type"
//   :
//     ["application/json;charset=UTF-8"], "Cache-Control"
//   :
//     ["no-cache", " no-store", " max-age=0", " must-revalidate"], "Expires"
//   :
//     ["0"]
//   }
// ,
//   "type"
// :
//   2, "url"
// :
//   "http://127.0.0.1:8080/StockPromotion/byTele/15695159855"
// }
