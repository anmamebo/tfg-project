import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDropdownComponent } from './user-dropdown.component';

describe('UserDropdownComponent', () => {
  let component: UserDropdownComponent;
  let fixture: ComponentFixture<UserDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDropdownComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
