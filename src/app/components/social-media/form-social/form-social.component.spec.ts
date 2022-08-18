import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSocialComponent } from './form-social.component';

describe('FormSocialComponent', () => {
  let component: FormSocialComponent;
  let fixture: ComponentFixture<FormSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
