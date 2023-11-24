import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInfoDepartmentsCardComponent } from './view-info-departments-card.component';

describe('ViewInfoDepartmentsCardComponent', () => {
  let component: ViewInfoDepartmentsCardComponent;
  let fixture: ComponentFixture<ViewInfoDepartmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInfoDepartmentsCardComponent]
    });
    fixture = TestBed.createComponent(ViewInfoDepartmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
