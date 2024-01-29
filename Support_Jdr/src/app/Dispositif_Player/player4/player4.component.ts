import { Component, OnInit } from '@angular/core';
import { PubnubService } from '../../pub-nub.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {fastWhiteBoard} from '../../lib/fastWhiteBoard';

@Component({
  selector: 'app-player4',
  templateUrl: './player4.component.html',
  styleUrls: ['./player4.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class Player4Component implements OnInit {
  messageContent = '';
  myMessages: any[] = [];

  constructor(private pubnubService: PubnubService) { }

  ngOnInit() {
    this.pubnubService.messages.subscribe(messages => {
      this.myMessages = messages.filter(msg => msg.recipient === 'player4' || msg.sender === 'player4');
    });

    fastWhiteBoard(4);

    
  }

  sendMessage(): void {
    if (this.messageContent.trim()) {
      this.pubnubService.sendMessage(this.messageContent, 'player4', 'MJ');
      this.messageContent = '';
    }
  }

}
