import { Component } from '@angular/core';
import {CarService} from "./CarService";
import {Car} from "./Car";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  clicks: number = 0;

  count() {
    this.clicks++;
    console.log("this.click="+this.clicks);
  }
  title = 'app work11123s!';

  cars: Car[];

  cols: any[];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getCarsSmall().then(cars => this.cars = cars);

    this.cols = [
      {field: 'vin', header: 'Vin'},
      {field: 'year', header: 'Year'},
      {field: 'brand', header: 'Brand'},
      {field: 'color', header: 'Color'}
    ];
  }
}

