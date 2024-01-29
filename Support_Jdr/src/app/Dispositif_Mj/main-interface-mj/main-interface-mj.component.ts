import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbianceButtonComponent } from '../ambiance-button/ambiance-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PubnubService } from '../../pub-nub.service';


@Component({
  selector: 'app-main-interface-mj',
  styleUrls: ['./main-interface-mj.component.css'],
  templateUrl: './main-interface-mj.component.html',
  imports: [AmbianceButtonComponent, FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true
})
export class MainInterfaceMjComponent {
  messageContent = '';
  myMessages: any[] = [];
  
  optionsForMeteoButton = ['Option 1A', 'Option 1B', 'Option 1C'];
  optionsForFestivalButton = ['Option 2A', 'Option 2B'];
  optionsForCombatButton = ['Option 3A', 'Option 3B', 'Option 3C', 'Option 3D'];
  optionsForTerrainButton = ['Option 3A', 'Option 3B', 'Option 3C', 'Option 3D'];


  constructor(public pubnubService: PubnubService) {
    this.pubnubService.messages.subscribe(messages => {
      this.myMessages = messages;
    });
  }

  sendMessage(): void {
    if (this.messageContent.trim()) {
      this.pubnubService.sendMessage(this.messageContent, 'MJ', 'player1');
      this.messageContent = '';
    }
  }

}
