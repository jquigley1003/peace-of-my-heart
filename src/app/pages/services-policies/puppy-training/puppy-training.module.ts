import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuppyTrainingPageRoutingModule } from './puppy-training-routing.module';

import { PuppyTrainingPage } from './puppy-training.page';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuppyTrainingPageRoutingModule,
    FooterModule
  ],
  declarations: [PuppyTrainingPage]
})
export class PuppyTrainingPageModule {}
