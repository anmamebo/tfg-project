import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoCardComponent } from './basic-info-card.component';

describe('BasicInfoCardComponent', () => {
  let component: BasicInfoCardComponent;
  let fixture: ComponentFixture<BasicInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
