import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreStatesTableComponent } from './store-states-table.component';

describe('StoreStatesTableComponent', () => {
  let component: StoreStatesTableComponent;
  let fixture: ComponentFixture<StoreStatesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreStatesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreStatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
