import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { GroupViewPageComponent } from './group-view-page.component';
import { BehaviorSubject } from 'rxjs';

describe('GroupViewPageComponent', () => {
  let component: GroupViewPageComponent;
  let fixture: ComponentFixture<GroupViewPageComponent>;

  class ActivatedRouteStub {
    private subject = new BehaviorSubject({ id: '1' });
    params = this.subject.asObservable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupViewPageComponent ],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
