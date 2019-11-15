/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RealtimeReportComponent } from './RealtimeReport.component';

describe('RealtimeReportComponent', () => {
  let component: RealtimeReportComponent;
  let fixture: ComponentFixture<RealtimeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
