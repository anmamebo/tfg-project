import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewInfoStatusAppointmentsCardComponent } from './view-info-status-appointments-card.component';

describe('ViewInfoStatusAppointmentsCardComponent', () => {
  let component: ViewInfoStatusAppointmentsCardComponent;
  let fixture: ComponentFixture<ViewInfoStatusAppointmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInfoStatusAppointmentsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ViewInfoStatusAppointmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
