import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCertificateComponent } from './form-certificate.component';

describe('FormCertificateComponent', () => {
  let component: FormCertificateComponent;
  let fixture: ComponentFixture<FormCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
