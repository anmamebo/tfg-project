import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddressPatientsCardComponent } from './view-address-patients-card.component';

describe('ViewAddressPatientsCardComponent', () => {
  let component: ViewAddressPatientsCardComponent;
  let fixture: ComponentFixture<ViewAddressPatientsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAddressPatientsCardComponent],
    });
    fixture = TestBed.createComponent(ViewAddressPatientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
