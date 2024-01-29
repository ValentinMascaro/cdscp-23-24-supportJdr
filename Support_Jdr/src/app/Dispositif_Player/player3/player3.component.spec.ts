import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Player3Component } from './player3.component';

describe('Player3Component', () => {
  let component: Player3Component;
  let fixture: ComponentFixture<Player3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Player3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Player3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
