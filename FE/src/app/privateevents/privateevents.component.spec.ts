import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateeventsComponent } from './privateevents.component';

describe('PrivateeventsComponent', () => {
  let component: PrivateeventsComponent;
  let fixture: ComponentFixture<PrivateeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateeventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
