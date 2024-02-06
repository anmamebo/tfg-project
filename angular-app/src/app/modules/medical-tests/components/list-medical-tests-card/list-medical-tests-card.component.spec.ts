import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMedicalTestsCardComponent } from './list-medical-tests-card.component';

describe('ListMedicalTestsCardComponent', () => {
  let component: ListMedicalTestsCardComponent;
  let fixture: ComponentFixture<ListMedicalTestsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMedicalTestsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ListMedicalTestsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
