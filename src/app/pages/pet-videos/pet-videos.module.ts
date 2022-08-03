import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetVideosPageRoutingModule } from './pet-videos-routing.module';

import { PetVideosPage } from './pet-videos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetVideosPageRoutingModule
  ],
  declarations: [PetVideosPage]
})
export class PetVideosPageModule {}
