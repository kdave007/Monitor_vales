import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossedComponent } from './crossed.component';

describe('CrossedComponent', () => {
  let component: CrossedComponent;
  let fixture: ComponentFixture<CrossedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
