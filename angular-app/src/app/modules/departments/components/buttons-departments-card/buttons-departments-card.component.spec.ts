import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsDepartmentsCardComponent } from './buttons-departments-card.component';

describe('ButtonsDepartmentsCardComponent', () => {
  let component: ButtonsDepartmentsCardComponent;
  let fixture: ComponentFixture<ButtonsDepartmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsDepartmentsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ButtonsDepartmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
