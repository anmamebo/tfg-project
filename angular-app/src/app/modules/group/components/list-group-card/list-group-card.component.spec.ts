import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupCardComponent } from './list-group-card.component';

describe('ListGroupCardComponent', () => {
  let component: ListGroupCardComponent;
  let fixture: ComponentFixture<ListGroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGroupCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
