import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValesStateTableComponent } from './vales-state-table.component';

describe('ValesStateTableComponent', () => {
  let component: ValesStateTableComponent;
  let fixture: ComponentFixture<ValesStateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValesStateTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValesStateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
