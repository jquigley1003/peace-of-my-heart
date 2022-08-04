import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetAndGreetPageRoutingModule } from './meet-and-greet-routing.module';

import { MeetAndGreetPage } from './meet-and-greet.page';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetAndGreetPageRoutingModule,
    FooterModule
  ],
  declarations: [MeetAndGreetPage]
})
export class MeetAndGreetPageModule {}
