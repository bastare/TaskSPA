/**
 * /* tslint:disable:no-unused-variable
 *
 * @format
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UpdateTaskDialogComponent } from './updateTaskDialog.component';

describe('UpdateTaskDialogComponent', () => {
  let component: UpdateTaskDialogComponent;
  let fixture: ComponentFixture<UpdateTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTaskDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
