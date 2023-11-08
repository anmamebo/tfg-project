import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupCardComponent } from './view-group-card.component';

describe('ViewGroupCardComponent', () => {
  let component: ViewGroupCardComponent;
  let fixture: ComponentFixture<ViewGroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGroupCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
