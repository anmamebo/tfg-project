import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentsCreatePageComponent } from './departments-create-page.component';

describe('DepartmentsCreatePageComponent', () => {
  let component: DepartmentsCreatePageComponent;
  let fixture: ComponentFixture<DepartmentsCreatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentsCreatePageComponent],
    });
    fixture = TestBed.createComponent(DepartmentsCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
