import { Component } from '@angular/core';
import {StockPromotionService} from "./StockPromotionService";
import {StockPromotion} from "./StockPromotion";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  tele: string ;

  query() {
    console.log("in query() this.tele="+this.tele)
    this.stockPromotionService.getStockPromotion(this.tele).then(stockPromotions => this.stockPromotions = stockPromotions);
  }
  title = '用户活动查询';

  stockPromotions: StockPromotion[];


  constructor(private stockPromotionService: StockPromotionService) { }

  ngOnInit() {
    console.log("init");
    //this.stockPromotionService.getStockPromotion("15695159855").then(stockPromotions => this.stockPromotions = stockPromotions);
  }
}

