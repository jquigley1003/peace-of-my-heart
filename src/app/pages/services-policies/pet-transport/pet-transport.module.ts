import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetTransportPageRoutingModule } from './pet-transport-routing.module';

import { PetTransportPage } from './pet-transport.page';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetTransportPageRoutingModule,
    FooterModule
  ],
  declarations: [PetTransportPage]
})
export class PetTransportPageModule {}
