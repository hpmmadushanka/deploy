import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcBurNdcComponent } from './nc-bur-ndc.component';

describe('NcBurNdcComponent', () => {
  let component: NcBurNdcComponent;
  let fixture: ComponentFixture<NcBurNdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcBurNdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcBurNdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
