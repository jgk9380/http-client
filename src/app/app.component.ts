import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  clicks: number = 0;

  count() {
    this.clicks++;
  }
  title = 'app work11123s!';
}
