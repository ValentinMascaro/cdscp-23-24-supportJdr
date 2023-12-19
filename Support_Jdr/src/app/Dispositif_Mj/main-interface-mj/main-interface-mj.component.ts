import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbianceButtonComponent } from '../ambiance-button/ambiance-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Player {
  pseudo: string;
  selected?: boolean;
}

@Component({
  selector: 'app-main-interface-mj',
  styleUrls: ['./main-interface-mj.component.css'],
  templateUrl: './main-interface-mj.component.html',
  imports: [AmbianceButtonComponent, FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true
})
export class MainInterfaceMjComponent {
  players: Player[] = [
    { pseudo: 'Joueur 1', selected: false },
    { pseudo: 'Joueur 2', selected: false },
    { pseudo: 'Joueur 3', selected: false },
  ];
  
  optionsForMeteoButton = ['Option 1A', 'Option 1B', 'Option 1C'];
  optionsForFestivalButton = ['Option 2A', 'Option 2B'];
  optionsForCombatButton = ['Option 3A', 'Option 3B', 'Option 3C', 'Option 3D'];
  optionsForTerrainButton = ['Option 3A', 'Option 3B', 'Option 3C', 'Option 3D'];


 
  sendToAllPlayers = false;
  messageContent = '';
  messageRecipient: 'all' | 'selected' | string = ''; // initialisé à une chaîne vide

  sendMessage(): void {
    if (this.sendToAllPlayers) {
      console.log('Envoyer à tous:', this.messageContent);
    } else {
      const selectedPlayers = this.players.filter(player => player.selected);
      console.log('Envoyer aux joueurs sélectionnés:', selectedPlayers.map(p => p.pseudo), this.messageContent);
    }
    this.resetForm();
  }

  toggleAllPlayers(): void {
    this.players.forEach(player => player.selected = false);
  }

  resetForm(): void {
    this.messageContent = '';
    this.sendToAllPlayers = false;
    this.players.forEach(player => player.selected = false);
  }
}