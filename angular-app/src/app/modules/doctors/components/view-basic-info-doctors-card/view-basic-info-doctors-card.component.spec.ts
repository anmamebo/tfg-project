import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewBasicInfoDoctorsCardComponent } from './view-basic-info-doctors-card.component';

describe('ViewBasicInfoDoctorsCardComponent', () => {
  let component: ViewBasicInfoDoctorsCardComponent;
  let fixture: ComponentFixture<ViewBasicInfoDoctorsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBasicInfoDoctorsCardComponent],
    });
    fixture = TestBed.createComponent(ViewBasicInfoDoctorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
