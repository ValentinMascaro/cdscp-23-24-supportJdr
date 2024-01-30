import { Component, OnInit } from '@angular/core';
import { PubnubService } from '../../pub-nub.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fastWhiteBoard } from '../../lib/fastWhiteBoard';

@Component({
  selector: 'app-player3',
  templateUrl: './player3.component.html',
  styleUrls: ['./player3.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class Player3Component implements OnInit {
  messageContent = '';
  myMessages: any[] = [];
  myId = 'player3';
  sendToAll: boolean = false;
  sendToPlayer1: boolean = false;
  sendToPlayer2: boolean = false;
  sendToPlayer4: boolean = false; // Ajoutez d'autres joueurs si nécessaire
  sendToMJ: boolean = false;

  constructor(private pubnubService: PubnubService) { }


  ngOnInit() {
    this.pubnubService.messages.subscribe(allMessages => {
      // Filtrer pour inclure uniquement les messages adressés à ce joueur ou à tous
      // et exclure les messages envoyés par ce joueur lui-même
      const filteredMessages = allMessages.filter(msg => 
        (msg.recipient === this.myId || msg.recipient === 'all') &&
        msg.sender !== this.myId
      );
  
      // Ajouter uniquement les nouveaux messages uniques à myMessages
      const newMessages = filteredMessages.filter(newMsg => 
        !this.myMessages.some(existingMsg => existingMsg.messageId === newMsg.messageId)
      );
  
      this.myMessages.push(...newMessages);
    });
    fastWhiteBoard("PJ");
  }




  sendMessage(): void {
    if (this.messageContent.trim()) {
      const messageId = Math.random().toString(36).substr(2, 9); // Générer un messageId unique
  
      // Déterminer les destinataires
      let recipients = this.determineRecipients();
  
      if (this.sendToAll || this.sendToMJ || recipients.length > 0) {
        if (this.sendToAll) {
          this.pubnubService.sendMessage(this.messageContent, this.myId, 'all', messageId);
        } else {
          if (this.sendToMJ) this.pubnubService.sendMessage(this.messageContent, this.myId, 'MJ', messageId);
          recipients.forEach(recipient => {
            this.pubnubService.sendMessage(this.messageContent, this.myId, recipient, messageId);
          });
        }
  
        // Ajouter le message envoyé à myMessages une seule fois
        this.myMessages.push({
          content: this.messageContent,
          sender: this.myId,
          recipient: this.sendToAll ? 'all' : (this.sendToMJ ? ['MJ', ...recipients] : recipients),
          messageId: messageId,
          timestamp: new Date()
        });
  
        this.messageContent = '';
      }
    }
  }
  
  private determineRecipients(): string[] {
    let recipients = [];
    if (this.sendToPlayer1) recipients.push('player1');
    if (this.sendToPlayer2) recipients.push('player2');
    if (this.sendToPlayer4) recipients.push('player4');
    // ... autres joueurs ...
    return recipients;
  }
}
