import { Routes } from '@angular/router';

import { MainInterfaceMjComponent } from './Dispositif_Mj/main-interface-mj/main-interface-mj.component';
import { AmbianceButtonComponent } from './Dispositif_Mj/ambiance-button/ambiance-button.component';

import { Player1Component } from './Dispositif_Player/player1/player1.component';
import { Player2Component } from './Dispositif_Player/player2/player2.component';
import { Player3Component } from './Dispositif_Player/player3/player3.component';
import { Player4Component } from './Dispositif_Player/player4/player4.component';

export const routes: Routes = [
    {path: '', redirectTo: '/MainInterfaceMjComponent', pathMatch: 'full'},
    {path: 'MainInterfaceMjComponent', component: MainInterfaceMjComponent},
    {path: 'AmbianceButtonComponent', component: AmbianceButtonComponent},

    {path: 'Player1', component: Player1Component},
    {path: 'Player2', component: Player2Component},
    {path: 'Player3', component: Player3Component},
    {path: 'Player4', component: Player4Component}
];
