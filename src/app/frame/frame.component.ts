import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login/Login.service";

@Component({
  selector: 'hc-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  menuShow: boolean = true;
  adsShow: boolean = false;
  display: boolean = false;
  constructor(public ss:LoginService) {
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
