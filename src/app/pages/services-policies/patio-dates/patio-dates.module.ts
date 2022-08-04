import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatioDatesPageRoutingModule } from './patio-dates-routing.module';

import { PatioDatesPage } from './patio-dates.page';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatioDatesPageRoutingModule,
    FooterModule
  ],
  declarations: [PatioDatesPage]
})
export class PatioDatesPageModule {}
