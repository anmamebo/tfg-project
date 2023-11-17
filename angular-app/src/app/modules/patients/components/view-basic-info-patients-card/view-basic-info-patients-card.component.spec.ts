import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenderPipe } from 'src/app/core/pipes/gender.pipe';

import { ViewBasicInfoPatientsCardComponent } from './view-basic-info-patients-card.component';

describe('ViewBasicInfoPatientsCardComponent', () => {
  let component: ViewBasicInfoPatientsCardComponent;
  let fixture: ComponentFixture<ViewBasicInfoPatientsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewBasicInfoPatientsCardComponent,
        GenderPipe
      ]
    });
    fixture = TestBed.createComponent(ViewBasicInfoPatientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
