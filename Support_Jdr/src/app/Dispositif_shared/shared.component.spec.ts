import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositifSharedComponent } from './shared.component';

describe('DispositifSharedComponent', () => {
  let component: DispositifSharedComponent;
  let fixture: ComponentFixture<DispositifSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispositifSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DispositifSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
