/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AverageReportComponent } from './AverageReport.component';

describe('AverageReportComponent', () => {
  let component: AverageReportComponent;
  let fixture: ComponentFixture<AverageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
