import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRoomsCardComponent } from './create-rooms-card.component';

describe('CreateRoomsCardComponent', () => {
  let component: CreateRoomsCardComponent;
  let fixture: ComponentFixture<CreateRoomsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoomsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CreateRoomsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
