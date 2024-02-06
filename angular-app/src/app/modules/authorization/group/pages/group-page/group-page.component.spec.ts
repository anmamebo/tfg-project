import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupPageComponent } from './group-page.component';

describe('GroupPageComponent', () => {
  let component: GroupPageComponent;
  let fixture: ComponentFixture<GroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupPageComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
