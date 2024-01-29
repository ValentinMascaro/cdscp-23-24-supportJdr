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
        bg: 'none' // Set the default background
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


  }


  sendMessage(): void {
    if (this.messageContent.trim()) {
      this.pubnubService.sendMessage(this.messageContent, 'player1', 'MJ');
      this.messageContent = '';
    }
  }
}
