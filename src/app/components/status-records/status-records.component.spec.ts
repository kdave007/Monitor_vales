import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusRecordsComponent } from './status-records.component';

describe('StatusRecordsComponent', () => {
  let component: StatusRecordsComponent;
  let fixture: ComponentFixture<StatusRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
