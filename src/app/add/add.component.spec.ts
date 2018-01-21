import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { AddDriverFormComponent } from '../shared/components/add-driver-form/add-driver-form.component';
import { MatCard, MatError, MatFormField, MatIcon, MatPlaceholder } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmMap, AgmMarker } from '@agm/core';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ AddComponent, AddDriverFormComponent, MatCard, MatPlaceholder, MatIcon, MatError, MatFormField, AgmMap, AgmMarker]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
