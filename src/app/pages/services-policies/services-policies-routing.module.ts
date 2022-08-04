import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesPoliciesPage } from './services-policies.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesPoliciesPage
  },
  {
    path: 'puppy-training',
    loadChildren: () => import('./puppy-training/puppy-training.module').then( m => m.PuppyTrainingPageModule)
  },
  {
    path: 'boarding',
    loadChildren: () => import('./boarding/boarding.module').then( m => m.BoardingPageModule)
  },
  {
    path: 'pet-transport',
    loadChildren: () => import('./pet-transport/pet-transport.module').then( m => m.PetTransportPageModule)
  },
  {
    path: 'field-trips',
    loadChildren: () => import('./field-trips/field-trips.module').then( m => m.FieldTripsPageModule)
  },
  {
    path: 'patio-dates',
    loadChildren: () => import('./patio-dates/patio-dates.module').then( m => m.PatioDatesPageModule)
  },
  {
    path: 'meet-and-greet',
    loadChildren: () => import('./meet-and-greet/meet-and-greet.module').then( m => m.MeetAndGreetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesPoliciesPageRoutingModule {}
