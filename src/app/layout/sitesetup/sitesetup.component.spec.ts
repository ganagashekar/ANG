/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SitesetupComponent } from './sitesetup.component';

describe('SitesetupComponent', () => {
  let component: SitesetupComponent;
  let fixture: ComponentFixture<SitesetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
