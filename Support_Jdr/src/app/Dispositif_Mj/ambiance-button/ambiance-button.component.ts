import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ambiance-button',
  templateUrl: './ambiance-button.component.html',
  styleUrls: ['./ambiance-button.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class AmbianceButtonComponent {
  @Input() imgSrc: string = '';
  @Input() title: string = '';
  @Input() options!: string[];  

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    console.log('Menu Open:', this.menuOpen); // Pour le débogage
  }
}