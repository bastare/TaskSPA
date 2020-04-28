/**
 * /* tslint:disable:no-unused-variable
 *
 * @format
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateProjectDialogComponent } from './createProjectDialog.component';

describe('CreateProjectDialogComponent', () => {
  let component: CreateProjectDialogComponent;
  let fixture: ComponentFixture<CreateProjectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProjectDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
