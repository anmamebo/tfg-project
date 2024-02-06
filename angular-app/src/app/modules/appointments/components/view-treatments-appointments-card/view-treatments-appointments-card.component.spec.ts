import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTreatmentsAppointmentsCardComponent } from './view-treatments-appointments-card.component';

describe('ViewTreatmentsAppointmentsCardComponent', () => {
  let component: ViewTreatmentsAppointmentsCardComponent;
  let fixture: ComponentFixture<ViewTreatmentsAppointmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTreatmentsAppointmentsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ViewTreatmentsAppointmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
