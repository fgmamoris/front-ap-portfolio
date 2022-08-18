import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPersonComponent } from './form-person.component';

describe('PersonFormComponent', () => {
  let component: FormPersonComponent;
  let fixture: ComponentFixture<FormPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
