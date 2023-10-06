import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgMakerDashboardRoutingModule } from './svg-maker-dashboard-routing.module';
import { DraggableDirective } from 'src/app/directives/draggable-directive.directive';
import { DroppableDirective } from 'src/app/directives/droppable-directive.directive';
import { SvgService } from 'src/app/services/svg-service.service';
import { SvgMakerDashboardComponent } from './svg-maker-dashboard.component';


@NgModule({
  declarations: [
    SvgMakerDashboardComponent,
    DraggableDirective,
    DroppableDirective
  ],
  imports: [
    CommonModule,
    SvgMakerDashboardRoutingModule
  ],
  providers: [SvgService]
})
export class SvgMakerDashboardModule { }
