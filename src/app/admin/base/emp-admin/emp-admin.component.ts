import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Employee} from "../../../base/employee";
import {GlobalService} from "../../../base/global-config.service";
import {EmpService} from "./emp.service";
import {Header} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';
import {Message} from "primeng/components/common/api";

@Component({
  selector: 'http-client-emp-admin',
  templateUrl: './emp-admin.component.html',
  styleUrls: ['./emp-admin.component.css'],
  providers: [EmpService]
})
export class EmpAdminComponent implements OnInit {

  constructor(private es: EmpService,private  gc:GlobalService) {
  }
  msgs: Message[] = [];
  emps: Employee[];
  currentPosition = 0;
  pageSize = 15;


  ngOnInit() {
    this.es.getEmps().then(x => {
      this.emps = x;
    })
  };

  getCurrentPageEmp(): Employee[] {
    if (this.emps)
      return this.emps.slice((this.currentPosition) * this.pageSize, (this.currentPosition + 1) * this.pageSize);
    else
      return null;
  }

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    console.log("event=" + JSON.stringify(event));
    this.currentPosition = event.page;
  }

  query(value: string) {
   if(!value){
     this.gc.showInfoMsg("请输入查询条件","提醒","warn");
     return;
   }
    this.es.queryEmps(value).then(x =>{
      this.emps = x;
      this.currentPosition=0;
    })
  }

}
