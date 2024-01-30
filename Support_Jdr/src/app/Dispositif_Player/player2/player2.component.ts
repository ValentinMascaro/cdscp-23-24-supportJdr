import { Component, OnInit } from '@angular/core';
import { PubnubService } from '../../pub-nub.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {fastWhiteBoard} from '../../lib/fastWhiteBoard';

@Component({
  selector: 'app-player',
  templateUrl: './player2.component.html',
  styleUrls: ['./player2.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class Player2Component implements OnInit {
  messageContent = '';
  myMessages: any[] = [];
  myId = 'player2';

  constructor(private pubnubService: PubnubService) {}

  ngOnInit() {
    this.pubnubService.messages.subscribe(messages => {
      this.myMessages = messages.filter(msg => 
        msg.recipient === this.myId || 
        msg.sender === this.myId || 
        msg.recipient === 'all'
      );
    });
    fastWhiteBoard("PJ");
  }

  sendMessage(): void {
    if (this.messageContent.trim()) {
      const messageId = Math.random().toString(36).substr(2, 9); // Générer un messageId unique
  
      this.pubnubService.sendMessage(this.messageContent, this.myId, 'all', messageId); // 'all' ou un ID de joueur spécifique
  
      // Ajouter manuellement le message envoyé à myMessages
      this.myMessages.push({
        content: this.messageContent,
        sender: this.myId,
        recipient: 'all', // ou un ID de joueur spécifique
        messageId: messageId,
        timestamp: new Date()
      });
  
      this.messageContent = '';
    }
  }
  
}






// import WhiteboardAPI from './WhiteboardAPI';
// let boards: any[]; // Declare the 'boards' variable
// WhiteboardAPI.getBoards().then(response => {
//   console.log(response);
//   boards = response.data; // Assign the 'data' property of 'response' to 'boards'
//   for (let i = 0; i < boards.length; i++) {
//     const board = boards[i];
//     console.log(board);
//   }
//   // Get the first board in the array
//   const board = boards[0];
//   console.log(board);
//   // Get the board's id
//   const boardId = board.id;
//   console.log(boardId);
//   // build the URL for the board
//   const boardURL = `${WhiteboardAPI.BASE_URL}/boards/${boardId}`;


// }).catch(error => {
//   console.error(error);
// });