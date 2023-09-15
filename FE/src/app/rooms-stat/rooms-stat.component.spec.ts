import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsStatComponent } from './rooms-stat.component';

describe('RoomsStatComponent', () => {
  let component: RoomsStatComponent;
  let fixture: ComponentFixture<RoomsStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
