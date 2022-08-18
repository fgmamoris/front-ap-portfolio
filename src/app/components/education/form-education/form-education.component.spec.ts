import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEducationComponent } from './form-education.component';

describe('FormEducationComponent', () => {
  let component: FormEducationComponent;
  let fixture: ComponentFixture<FormEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
