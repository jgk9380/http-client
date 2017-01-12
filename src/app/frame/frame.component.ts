import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'http-client-app',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  menuShow: boolean=false

  constructor() {
  }

  ngOnInit() {

  }

  menuToggle() {
    console.log("toggle menu");
    this.menuShow = !this.menuShow;
  }

}
