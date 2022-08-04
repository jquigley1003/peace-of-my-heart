import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardingPageRoutingModule } from './boarding-routing.module';

import { BoardingPage } from './boarding.page';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoardingPageRoutingModule,
    FooterModule
  ],
  declarations: [BoardingPage]
})
export class BoardingPageModule {}
