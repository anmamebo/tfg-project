import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DoctorInfoCardComponent } from './doctor-info-card.component';

describe('DoctorInfoCardComponent', () => {
  let component: DoctorInfoCardComponent;
  let fixture: ComponentFixture<DoctorInfoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorInfoCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(DoctorInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
