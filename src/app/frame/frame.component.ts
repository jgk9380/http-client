import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'http-client-app',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  sideMenuToggle: boolean;

  constructor() {
  }

  ngOnInit() {
    this.sideMenuToggle = true;
  }

  menuToggle() {
    console.log("toggle menu");
    this.sideMenuToggle = !this.sideMenuToggle;
  }
}
