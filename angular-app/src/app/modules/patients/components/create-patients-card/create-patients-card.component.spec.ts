import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CreatePatientsCardComponent } from './create-patients-card.component';

describe('CreatePatientsCardComponent', () => {
  let component: CreatePatientsCardComponent;
  let fixture: ComponentFixture<CreatePatientsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePatientsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CreatePatientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
