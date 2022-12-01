import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsPageRoutingModule } from './reservations-routing.module';

import { ReservationsPage } from './reservations.page';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { SignInModalModule } from 'src/app/shared/components/sign-in-modal/sign-in-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReservationsPageRoutingModule,
    FooterModule,
    SignInModalModule
  ],
  declarations: [ReservationsPage]
})
export class ReservationsPageModule {}
