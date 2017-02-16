/**
 * Created by jianggk on 2017/2/16.
 */
/**
 * Created by jianggk on 2017/1/10.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmpAdminComponent} from "./emp-admin/emp-admin.component";
import {DataTableModule, SharedModule} from 'primeng/primeng';

const routes: Routes = [
  {path: 'empAdmin', component: EmpAdminComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes),
    DataTableModule,
    SharedModule,],
  exports: [RouterModule]
})
export class BaseAdminRoutingModule {
}
