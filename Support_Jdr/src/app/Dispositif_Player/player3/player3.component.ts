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

  constructor(private pubnubService: PubnubService) { }

  ngOnInit() {
    this.pubnubService.messages.subscribe(messages => {
      this.myMessages = messages.filter(msg => msg.recipient === 'player3' || msg.sender === 'player3');
    });

    fastWhiteBoard(3);

    
  }

  sendMessage(): void {
    if (this.messageContent.trim()) {
      this.pubnubService.sendMessage(this.messageContent, 'player3', 'MJ');
      this.messageContent = '';
    }
  }

}
