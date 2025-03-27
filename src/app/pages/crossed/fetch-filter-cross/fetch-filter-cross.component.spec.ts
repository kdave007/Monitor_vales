import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchFilterCrossComponent } from './fetch-filter-cross.component';

describe('FetchFilterCrossComponent', () => {
  let component: FetchFilterCrossComponent;
  let fixture: ComponentFixture<FetchFilterCrossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchFilterCrossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchFilterCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
