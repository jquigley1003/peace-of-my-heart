import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetAndGreetPage } from './meet-and-greet.page';

const routes: Routes = [
  {
    path: '',
    component: MeetAndGreetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetAndGreetPageRoutingModule {}
