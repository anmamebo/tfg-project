import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordCardComponent } from './change-password-card.component';

describe('ChangePasswordCardComponent', () => {
  let component: ChangePasswordCardComponent;
  let fixture: ComponentFixture<ChangePasswordCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
