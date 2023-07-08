import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebNavMenuComponent } from './web-nav-menu.component';

describe('WebNavMenuComponent', () => {
  let component: WebNavMenuComponent;
  let fixture: ComponentFixture<WebNavMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebNavMenuComponent]
    });
    fixture = TestBed.createComponent(WebNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
