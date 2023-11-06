import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupCardComponent } from './create-group-card.component';

describe('CreateGroupCardComponent', () => {
  let component: CreateGroupCardComponent;
  let fixture: ComponentFixture<CreateGroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
