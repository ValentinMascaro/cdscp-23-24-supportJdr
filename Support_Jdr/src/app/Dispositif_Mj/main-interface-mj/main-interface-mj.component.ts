import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbianceButtonComponent } from '../ambiance-button/ambiance-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PubnubService } from '../../pub-nub.service';
import { fastWhiteBoard } from '../../lib/fastWhiteBoard';

interface Player {
  id: string;
  pseudo: string;
  selected: boolean;
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
    { id: 'player1', pseudo: 'Joueur 1', selected: false },
    { id: 'player2', pseudo: 'Joueur 2', selected: false },
    { id: 'player3', pseudo: 'Joueur 3', selected: false },
    { id: 'player4', pseudo: 'Joueur 4', selected: false }
  ];
  messageContent = '';
  myMessages: any[] = [];
  sendToAll: boolean = false;

  optionsForMeteoButton = ['light', 'dark', 'Option 1C'];
  optionsForFestivalButton = ['Option 2A', 'Option 2B'];
  optionsForCombatButton = ['Option 3A', 'Option 3B', 'Option 3C', 'Option 3D'];
  optionsForTerrainButton = ['Option 3A', 'Option 3B', 'Option 3C', 'Option 3D'];

  constructor(public pubnubService: PubnubService) {
    this.pubnubService.messages.subscribe(allMessages => {
      // Filtrer pour inclure uniquement les messages adressés au MJ ou à tous
      const filteredMessages = allMessages.filter(msg => 
        msg.recipient === 'MJ' || msg.recipient === 'all'
      );
  
      // Ajouter uniquement les nouveaux messages uniques à myMessages
      const newMessages = filteredMessages.filter(newMsg => 
        !this.myMessages.some(existingMsg => existingMsg.messageId === newMsg.messageId)
      );
  
      this.myMessages.push(...newMessages);
    });
  }

  ngOnInit() {
    fastWhiteBoard("MJ");
  }

  sendMessage(): void {
    if (this.messageContent.trim()) {
      const messageId = Math.random().toString(36).substr(2, 9); // Générer un messageId unique
  
      if (this.sendToAll) {
        this.pubnubService.sendMessage(this.messageContent, 'MJ', 'all', messageId);
      } else {
        this.players.forEach(player => {
          if (player.selected) {
            this.pubnubService.sendMessage(this.messageContent, 'MJ', player.id, messageId);
          }
        });
      }
  
      // Ajouter manuellement le message envoyé à myMessages
      this.myMessages.push({
        content: this.messageContent,
        sender: 'MJ',
        recipient: this.sendToAll ? 'all' : this.players.filter(p => p.selected).map(p => p.id),
        messageId: messageId,
        timestamp: new Date()
      });
  
      this.messageContent = '';
      this.resetSelection();
    }
  }

  resetSelection(): void {
    this.players.forEach(player => player.selected = false);
  }
}

