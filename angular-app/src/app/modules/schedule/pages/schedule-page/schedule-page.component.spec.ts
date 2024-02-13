import { registerLocaleData } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import localeEs from '@angular/common/locales/es';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CalendarCommonModule,
  CalendarDateFormatter,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CustomDateFormatter } from 'src/app/core/providers/custom-date-formatter.provider';
import { SchedulePageComponent } from './schedule-page.component';

describe('SchedulePageComponent', () => {
  let component: SchedulePageComponent;
  let fixture: ComponentFixture<SchedulePageComponent>;

  beforeEach(() => {
    registerLocaleData(localeEs);
    TestBed.configureTestingModule({
      declarations: [SchedulePageComponent],
      imports: [HttpClientTestingModule, CalendarCommonModule],
      providers: [
        { provide: DateAdapter, useValue: adapterFactory },
        { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
      ],
    });
    fixture = TestBed.createComponent(SchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
