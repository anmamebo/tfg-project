import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEditPageComponent } from './group-edit-page.component';

describe('GroupEditPageComponent', () => {
  let component: GroupEditPageComponent;
  let fixture: ComponentFixture<GroupEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
