import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInterfaceMjComponent } from './main-interface-mj.component';

describe('MainInterfaceMjComponent', () => {
  let component: MainInterfaceMjComponent;
  let fixture: ComponentFixture<MainInterfaceMjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainInterfaceMjComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainInterfaceMjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
