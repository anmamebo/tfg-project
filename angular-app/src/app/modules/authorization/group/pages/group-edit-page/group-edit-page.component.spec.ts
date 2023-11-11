import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { GroupEditPageComponent } from './group-edit-page.component';
import { BehaviorSubject } from 'rxjs';


describe('GroupEditPageComponent', () => {
  let component: GroupEditPageComponent;
  let fixture: ComponentFixture<GroupEditPageComponent>;

  class ActivatedRouteStub {
    private subject = new BehaviorSubject({ id: '1' });
    params = this.subject.asObservable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupEditPageComponent ],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      imports: [HttpClientTestingModule]
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
