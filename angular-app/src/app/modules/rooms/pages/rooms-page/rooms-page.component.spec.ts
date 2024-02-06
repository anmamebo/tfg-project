import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsPageComponent } from './rooms-page.component';

describe('RoomsPageComponent', () => {
  let component: RoomsPageComponent;
  let fixture: ComponentFixture<RoomsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsPageComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(RoomsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
