import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesPoliciesPage } from './services-policies.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesPoliciesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesPoliciesPageRoutingModule {}
