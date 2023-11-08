import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPermissionCardComponent } from './list-permission-card.component';

describe('ListPermissionCardComponent', () => {
  let component: ListPermissionCardComponent;
  let fixture: ComponentFixture<ListPermissionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPermissionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPermissionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
