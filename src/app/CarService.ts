
import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Car} from "./Car";
import {car} from "./cars-small";
@Injectable()
export class CarService {
  constructor(private http: Http) {}
  getCarsSmall() {
    // return new Promise<Car[]>(resolve =>
    //   setTimeout(resolve, 2000)) // delay 2 seconds
    //   .then(() => this.getCarsSmall());

    return Promise.resolve(car);
  }


}
