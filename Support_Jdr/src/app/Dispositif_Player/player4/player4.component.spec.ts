import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Player4Component } from './player4.component';

describe('Player4Component', () => {
  let component: Player4Component;
  let fixture: ComponentFixture<Player4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Player4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Player4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
