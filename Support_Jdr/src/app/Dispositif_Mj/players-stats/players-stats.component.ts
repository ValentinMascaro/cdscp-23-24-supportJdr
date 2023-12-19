import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Player {
  pseudo: string;
  hp: number;
  inspiration: number;
  ac: number;
  strength: number;
  dexterity: number;
  charisma: number;
  constitution: number;
  wisdom: number;
  intelligence: number;
}

@Component({
  selector: 'app-players-stat',
  templateUrl: './players-stats.component.html',
  styleUrls: ['./players-stats.component.css'],
  standalone: true,
  imports: [CommonModule]
})

export class PlayersStatComponent {
  @Input() player!: Player; // "!" indique que la propriété sera assignée.
}
