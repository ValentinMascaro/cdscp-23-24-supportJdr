import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ],
  standalone: true
})


export class MenuComponent implements OnInit {
  isMJ: boolean = false;
  isPlayer: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  setMJ(): void {
    this.isMJ = true;
    this.isPlayer = false;
  }

  setPlayer(): void {
    this.isMJ = false;
    this.isPlayer = true;
  }
}