import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineInfoProfileComponent } from './line-info-profile.component';

describe('LineInfoProfileComponent', () => {
  let component: LineInfoProfileComponent;
  let fixture: ComponentFixture<LineInfoProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineInfoProfileComponent]
    });
    fixture = TestBed.createComponent(LineInfoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
