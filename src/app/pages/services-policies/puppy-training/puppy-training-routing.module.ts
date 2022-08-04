import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuppyTrainingPage } from './puppy-training.page';

const routes: Routes = [
  {
    path: '',
    component: PuppyTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuppyTrainingPageRoutingModule {}
