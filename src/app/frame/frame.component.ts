import {Component, OnInit} from '@angular/core';
import {SystemService} from "../base/System.service";

@Component({
  selector: 'hc-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  menuShow: boolean = false;
  adsShow: boolean = false;
  display: boolean = false;

  constructor(public ss:SystemService) {
  }

  ngOnInit() {
  }

  menuToggle() {
    console.log("toggle menu");
    this.menuShow = !this.menuShow;
  }

  showLogin() {
    this.display = true;
  }
  closeLogin(){
    this.display = false;
  }

}
