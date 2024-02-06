import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsDoctorsCardComponent } from './buttons-doctors-card.component';

describe('ButtonsDoctorsCardComponent', () => {
  let component: ButtonsDoctorsCardComponent;
  let fixture: ComponentFixture<ButtonsDoctorsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsDoctorsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ButtonsDoctorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
