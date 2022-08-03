import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetVideosPage } from './pet-videos.page';

const routes: Routes = [
  {
    path: '',
    component: PetVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetVideosPageRoutingModule {}
