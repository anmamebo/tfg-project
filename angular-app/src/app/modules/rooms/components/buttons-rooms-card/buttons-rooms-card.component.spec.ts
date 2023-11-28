import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ButtonsRoomsCardComponent } from './buttons-rooms-card.component';

describe('ButtonsRoomsCardComponent', () => {
  let component: ButtonsRoomsCardComponent;
  let fixture: ComponentFixture<ButtonsRoomsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsRoomsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ButtonsRoomsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
