import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsCreatePageComponent } from './patients-create-page.component';

describe('PatientsCreatePageComponent', () => {
  let component: PatientsCreatePageComponent;
  let fixture: ComponentFixture<PatientsCreatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsCreatePageComponent],
    });
    fixture = TestBed.createComponent(PatientsCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
