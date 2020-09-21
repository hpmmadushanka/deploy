import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportRequiredComponent } from './support-required.component';

describe('SupportRequiredComponent', () => {
  let component: SupportRequiredComponent;
  let fixture: ComponentFixture<SupportRequiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportRequiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
