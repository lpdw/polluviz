/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageAPIComponent } from './page-api.component';

describe('PageAPIComponent', () => {
  let component: PageAPIComponent;
  let fixture: ComponentFixture<PageAPIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAPIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
