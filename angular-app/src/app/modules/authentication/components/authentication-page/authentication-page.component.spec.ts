import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationPageComponent } from './authentication-page.component';

describe('AuthenticationPageComponent', () => {
  let component: AuthenticationPageComponent;
  let fixture: ComponentFixture<AuthenticationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationPageComponent]
    });
    fixture = TestBed.createComponent(AuthenticationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
