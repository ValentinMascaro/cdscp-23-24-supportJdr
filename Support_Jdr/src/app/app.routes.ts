import { Routes } from '@angular/router';

import { MainInterfaceMjComponent } from './Dispositif_Mj/main-interface-mj/main-interface-mj.component';
export const routes: Routes = [
    {path: '', redirectTo: '/MainInterfaceMjComponent', pathMatch: 'full'},
    {path: 'MainInterfaceMjComponent', component: MainInterfaceMjComponent}
];
