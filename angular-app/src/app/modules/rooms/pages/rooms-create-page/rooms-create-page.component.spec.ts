import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsCreatePageComponent } from './rooms-create-page.component';

describe('RoomsCreatePageComponent', () => {
  let component: RoomsCreatePageComponent;
  let fixture: ComponentFixture<RoomsCreatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsCreatePageComponent]
    });
    fixture = TestBed.createComponent(RoomsCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
