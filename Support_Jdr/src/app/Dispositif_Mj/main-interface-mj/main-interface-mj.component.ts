import { Component } from '@angular/core';
import { AmbianceButtonComponent } from '../ambiance-button/ambiance-button.component';
import { Player, PlayersStatComponent } from '../players-stats/players-stats.component';

@Component({
  selector: 'app-main-interface-mj',
  styleUrls: ['./main-interface-mj.component.css'],
  templateUrl: './main-interface-mj.component.html',
  imports: [AmbianceButtonComponent, PlayersStatComponent],
  standalone: true
})


export class MainInterfaceMjComponent {
  optionsForMeteoButton = ['Option 1A', 'Option 1B', 'Option 1C'];
  optionsForFestivalButton = ['Option 2A', 'Option 2B'];
  optionsForCombatButton = ['Option 3A', 'Option 3B', 'Option 3C', 'Option 3D'];
  optionsForTerrainButton = ['Option 3A', 'Option 3B', 'Option 3C', 'Option 3D'];
}


export class ParentComponent {
  players: Player[] = [
    // Vos données de joueurs ici
  ];
}
