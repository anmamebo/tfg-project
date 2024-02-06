import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsTableComponent } from './patients-table.component';

describe('PatientsTableComponent', () => {
  let component: PatientsTableComponent;
  let fixture: ComponentFixture<PatientsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsTableComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(PatientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
