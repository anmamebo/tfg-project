import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AverageWaitingTimeCardComponent } from './average-waiting-time-card.component';

describe('AverageWaitingTimeCardComponent', () => {
  let component: AverageWaitingTimeCardComponent;
  let fixture: ComponentFixture<AverageWaitingTimeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AverageWaitingTimeCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(AverageWaitingTimeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
