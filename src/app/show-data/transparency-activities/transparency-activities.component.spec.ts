import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparencyActivitiesComponent } from './transparency-activities.component';

describe('TransparencyActivitiesComponent', () => {
  let component: TransparencyActivitiesComponent;
  let fixture: ComponentFixture<TransparencyActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransparencyActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransparencyActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
