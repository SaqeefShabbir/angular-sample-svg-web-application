import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgMakerDashboardComponent } from './svg-maker-dashboard.component';

describe('SvgMakerDashboardComponent', () => {
  let component: SvgMakerDashboardComponent;
  let fixture: ComponentFixture<SvgMakerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgMakerDashboardComponent]
    });
    fixture = TestBed.createComponent(SvgMakerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
