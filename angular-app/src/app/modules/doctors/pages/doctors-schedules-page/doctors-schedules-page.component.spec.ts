import { registerLocaleData } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import localeEs from '@angular/common/locales/es';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomDateFormatter } from '@app/core/providers/custom-date-formatter.provider';
import {
  CalendarCommonModule,
  CalendarDateFormatter,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DoctorsSchedulesPageComponent } from './doctors-schedules-page.component';

describe('DoctorsSchedulesPageComponent', () => {
  let component: DoctorsSchedulesPageComponent;
  let fixture: ComponentFixture<DoctorsSchedulesPageComponent>;

  beforeEach(() => {
    registerLocaleData(localeEs);
    TestBed.configureTestingModule({
      declarations: [DoctorsSchedulesPageComponent],
      imports: [HttpClientTestingModule, CalendarCommonModule],
      providers: [
        { provide: DateAdapter, useValue: adapterFactory },
        { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
      ],
    });
    fixture = TestBed.createComponent(DoctorsSchedulesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
