import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorsCreatePageComponent } from './doctors-create-page.component';

describe('DoctorsCreatePageComponent', () => {
  let component: DoctorsCreatePageComponent;
  let fixture: ComponentFixture<DoctorsCreatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsCreatePageComponent],
    });
    fixture = TestBed.createComponent(DoctorsCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
