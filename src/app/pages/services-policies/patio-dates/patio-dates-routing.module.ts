import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatioDatesPage } from './patio-dates.page';

const routes: Routes = [
  {
    path: '',
    component: PatioDatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatioDatesPageRoutingModule {}
