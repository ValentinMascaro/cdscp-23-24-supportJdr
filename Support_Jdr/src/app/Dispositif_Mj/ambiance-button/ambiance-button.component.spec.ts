import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbianceButtonComponent } from './ambiance-button.component';

describe('AmbianceButtonComponent', () => {
  let component: AmbianceButtonComponent;
  let fixture: ComponentFixture<AmbianceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbianceButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmbianceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
