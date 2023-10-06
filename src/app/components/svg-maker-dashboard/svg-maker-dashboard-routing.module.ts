import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SvgMakerDashboardComponent } from './svg-maker-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SvgMakerDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SvgMakerDashboardRoutingModule { }
