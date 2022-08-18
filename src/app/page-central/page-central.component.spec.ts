import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCentralComponent } from './page-central.component';

describe('PageCentralComponent', () => {
  let component: PageCentralComponent;
  let fixture: ComponentFixture<PageCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCentralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
