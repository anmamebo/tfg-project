import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericPageComponent } from './generic-page.component';

describe('GenericPageComponent', () => {
  let component: GenericPageComponent;
  let fixture: ComponentFixture<GenericPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericPageComponent],
    });
    fixture = TestBed.createComponent(GenericPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
