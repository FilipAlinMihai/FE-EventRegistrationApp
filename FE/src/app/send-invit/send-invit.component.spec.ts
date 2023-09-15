import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInvitComponent } from './send-invit.component';

describe('SendInvitComponent', () => {
  let component: SendInvitComponent;
  let fixture: ComponentFixture<SendInvitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendInvitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendInvitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
