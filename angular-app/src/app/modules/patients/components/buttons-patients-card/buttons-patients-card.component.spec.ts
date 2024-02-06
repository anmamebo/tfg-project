import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsPatientsCardComponent } from './buttons-patients-card.component';

describe('ButtonsPatientsCardComponent', () => {
  let component: ButtonsPatientsCardComponent;
  let fixture: ComponentFixture<ButtonsPatientsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsPatientsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ButtonsPatientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
