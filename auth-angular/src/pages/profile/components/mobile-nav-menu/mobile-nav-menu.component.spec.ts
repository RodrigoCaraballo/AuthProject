import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavMenuComponent } from './mobile-nav-menu.component';

describe('MobileNavMenuComponent', () => {
  let component: MobileNavMenuComponent;
  let fixture: ComponentFixture<MobileNavMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileNavMenuComponent]
    });
    fixture = TestBed.createComponent(MobileNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
