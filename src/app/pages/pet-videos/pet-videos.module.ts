import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetVideosPageRoutingModule } from './pet-videos-routing.module';

import { PetVideosPage } from './pet-videos.page';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetVideosPageRoutingModule,
    FooterModule
  ],
  declarations: [PetVideosPage]
})
export class PetVideosPageModule {}
