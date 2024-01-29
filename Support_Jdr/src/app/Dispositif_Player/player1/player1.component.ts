import { Component, OnInit } from '@angular/core';
import { PubnubService } from '../../pub-nub.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player1.component.html',
  styleUrls: ['./player1.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class Player1Component implements OnInit {
  messageContent = '';
  myMessages: any[] = [];

  constructor(private pubnubService: PubnubService) {}

  ngOnInit() {
    this.pubnubService.messages.subscribe(messages => {
      this.myMessages = messages.filter(msg => msg.recipient === 'player1' || msg.sender === 'player1');
    });
  }

  sendMessage(): void {
    if (this.messageContent.trim()) {
      this.pubnubService.sendMessage(this.messageContent, 'player1', 'MJ');
      this.messageContent = '';
    }
  }
}