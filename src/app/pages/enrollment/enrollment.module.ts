import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EnrollmentPageRoutingModule } from './enrollment-routing.module';
import { EnrollmentPage } from './enrollment.page';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { SignInModalModule } from 'src/app/shared/components/sign-in-modal/sign-in-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EnrollmentPageRoutingModule,
    FooterModule,
    SignInModalModule
  ],
  declarations: [EnrollmentPage]
})
export class EnrollmentPageModule {}
