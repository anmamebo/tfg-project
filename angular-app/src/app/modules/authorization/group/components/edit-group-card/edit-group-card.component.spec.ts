import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGroupCardComponent } from './edit-group-card.component';

describe('EditGroupCardComponent', () => {
  let component: EditGroupCardComponent;
  let fixture: ComponentFixture<EditGroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGroupCardComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
