import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AmbianceButtonComponent } from './ambiance-button.component';

describe('AmbianceButtonComponent', () => {
  let component: AmbianceButtonComponent;
  let fixture: ComponentFixture<AmbianceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], // Importez HttpClientModule ici
      declarations: [AmbianceButtonComponent] // Déclarez le composant à tester ici
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
