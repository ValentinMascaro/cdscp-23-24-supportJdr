import { Component, OnInit } from '@angular/core';
import { PubnubService } from '../../pub-nub.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {fastWhiteBoard} from '../../lib/fastWhiteBoard';

@Component({
  selector: 'app-player1',
  templateUrl: './player1.component.html',
  styleUrls: ['./player1.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class Player1Component implements OnInit {
  messageContent = '';
  myMessages: any[] = [];
  myId = 'player1';

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


//   setTimeout(() => {
//     // Get the iframe element
//   const iframe = document.querySelector('#whiteboard_team') as HTMLIFrameElement;

//   // Check if the iframe is not null
//   if (iframe) {
//     // Access the contentWindow of the iframe
//     const iframeWindow = iframe.contentWindow;
//     // Check if contentWindow is not null
//     if (iframeWindow) {
//       // Access the document inside the iframe
//       const iframeDocument = iframeWindow.document;

//       // Now you can interact with the content of the iframeDocument
//       // For example, you can access elements inside the iframe:
//       const iframeContentElement = iframeDocument.querySelector('#board');

//       // Do something with the iframe content
//       if (iframeContentElement) {
//         console.log(iframeContentElement);
//       }
//     } else {
//       console.error('Unable to access contentWindow of the iframe.');
//     }
//   } else {
//     console.error('Unable to find the iframe element.');
//   }
// }, 3000);