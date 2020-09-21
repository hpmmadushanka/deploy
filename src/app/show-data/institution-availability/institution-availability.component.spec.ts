import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAvailabilityComponent } from './institution-availability.component';

describe('InstitutionAvailabilityComponent', () => {
  let component: InstitutionAvailabilityComponent;
  let fixture: ComponentFixture<InstitutionAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
