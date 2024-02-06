import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentsHistoricalViewPageComponent } from './appointments-historical-view-page.component';

describe('AppointmentsHistoricalViewPageComponent', () => {
  let component: AppointmentsHistoricalViewPageComponent;
  let fixture: ComponentFixture<AppointmentsHistoricalViewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsHistoricalViewPageComponent],
    });
    fixture = TestBed.createComponent(AppointmentsHistoricalViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
