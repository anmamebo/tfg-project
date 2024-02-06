import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableAppointmentsComponent } from './table-appointments.component';

describe('TableAppointmentsComponent', () => {
  let component: TableAppointmentsComponent;
  let fixture: ComponentFixture<TableAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableAppointmentsComponent],
    });
    fixture = TestBed.createComponent(TableAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
