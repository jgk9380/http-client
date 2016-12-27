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

   // stockPromotionUrl: string = "http://122.192.127.45:8080/StockPromotion/byTele/";
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
    alert("程序错误:"+(error.message||error.toString()));
    return Promise.reject(error.message || error);
  }
}
