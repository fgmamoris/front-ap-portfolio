import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInterestComponent } from './form-interest.component';

describe('EditFormInterestsComponent', () => {
  let component: FormInterestComponent;
  let fixture: ComponentFixture<FormInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormInterestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
