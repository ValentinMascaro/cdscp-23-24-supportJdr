import { Routes } from '@angular/router';

import { MainInterfaceMjComponent } from './Dispositif_Mj/main-interface-mj/main-interface-mj.component';
import { AmbianceButtonComponent } from './Dispositif_Mj/ambiance-button/ambiance-button.component';

export const routes: Routes = [
    {path: '', redirectTo: '/MainInterfaceMjComponent', pathMatch: 'full'},
    {path: 'MainInterfaceMjComponent', component: MainInterfaceMjComponent},
    {path: 'AmbianceButtonComponent', component: AmbianceButtonComponent}
];
