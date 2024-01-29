// ambiance-button.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  option1CInput: string = 'type a word';

  constructor(private http: HttpClient) { }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    console.log('Menu Open:', this.menuOpen);
  }

  handleOptionClick(event: Event, option: string): void {
    event.preventDefault();
    if (option === 'light' || option === 'dark') {
      this.sendCommand(option.toLowerCase());
    } else if (option === 'Option 1C') {
      this.menuOpen = true;
    }
  }

  sendCommand(command: string): void {
    this.http.get(`http://localhost:1880/commande/${command}`).subscribe(
      data => {
        console.log('HTTP GET Response:', data);
      },
      error => {
        console.error('HTTP GET Error:', error);
      }
    );
  }

  handleInputChange(event: Event): string {
    return (event.target as HTMLInputElement).value ?? '';
  }

  handleEnterKeyPress(): void {
    if (this.option1CInput.trim() !== '') {
      this.sendCommand(this.option1CInput.toLowerCase());
    }
    this.option1CInput = '';
    this.menuOpen = false;
  }
}
