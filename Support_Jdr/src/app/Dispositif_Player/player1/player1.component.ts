import { Component, OnInit } from '@angular/core';
import { PubnubService } from '../../pub-nub.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var require: any;
const api = require('./api.js');

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

  constructor(private pubnubService: PubnubService) { }

  ngOnInit() {
    this.pubnubService.messages.subscribe(messages => {
      this.myMessages = messages.filter(msg => msg.recipient === 'player1' || msg.sender === 'player1');
    });

    // debug tempAPI

    // show the type of tempAPI
    console.log(typeof api);
    console.log(api);


    const id = "e008c35c4bd5ed98ec5ccbfe943a8639";
    const boardCode = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

    let wt = new api.default.WhiteboardTeam('#wt-container', {

      // let wt = new api.WhiteboardTeam('#wt-container', {
      clientId: id, // Replace with your client ID
      boardCode: boardCode, // Replace with your board code
      participant: {
        role: 'facilitator', // Set the role of the participant[^3^][3]
        name: Math.random().toString() + '_name' // Set the display name of the participant
      },
      board: {
        defaultTool: 'pen', // Set the default tool
        defaultThickness: 3, // Set the default thickness
        defaultColor: '#FFFFFF', // Set the default color
        bg: 'None' // Set the default background
      }
    });

    // Listen for the ready event
    wt.addListener("ready", (ctx: any) => {
      console.log("The whiteboard is ready and user is: ", ctx.uid);

    });


    // Listen for the error event
    wt.addListener("error", (error: any) => {
      console.log("An error occurred: ", error);
      // You can handle the error here
    });

    wt.addListener('ready', (ctx: any) => {
      console.log('ready', ctx);

      // const urlHerbe = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.photo-paysage.com%2Falbums%2Fuserpics%2F10001%2FHerbe-et-gouttes-d_eau---2.jpg&f=1&nofb=1&ipt=e547ecba00b6c9599e38e661c04144f263caa5e0afa9d96151e59d3c5696c87d&ipo=images"
    //  C:/Users/Lucas/Documents/Fac/BIMESTRE_2/Dev_Cyber/cdscp-23-24-supportJdr/Support_Jdr/src/app/Dispositif_Player/player1/herbe.png
    // const urlHerbe = "https://www.decorationsdemariage.fr/16104-home_default/le-chemin-de-table-en-mousse-verte.jpg"
    


    // imgSrc="../../../assets/duel.png"

    
    
    
    const urlHerbe = "http://localhost:4200/Player1/../../../assets/aerial_view.png";
      wt.drawImage(urlHerbe);



      wt.drawText(100, 100, "Hello World", "black", 14);


    


    }


    );



  }

  sendMessage(): void {
    if (this.messageContent.trim()) {
      this.pubnubService.sendMessage(this.messageContent, 'player1', 'MJ');
      this.messageContent = '';
    }
  }

  modifyIframe() : void {
    
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