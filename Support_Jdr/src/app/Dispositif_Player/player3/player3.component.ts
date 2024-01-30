import { Component, OnInit } from '@angular/core';
import { PubnubService } from '../../pub-nub.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {fastWhiteBoard} from '../../lib/fastWhiteBoard';

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

  constructor(private pubnubService: PubnubService) { }

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
      this.pubnubService.sendMessage(this.messageContent, this.myId, 'all'); // 'all' ou un ID de joueur spécifique
      this.messageContent = '';
    }
  }
}
