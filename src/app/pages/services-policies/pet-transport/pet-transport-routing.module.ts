import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetTransportPage } from './pet-transport.page';

const routes: Routes = [
  {
    path: '',
    component: PetTransportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetTransportPageRoutingModule {}
