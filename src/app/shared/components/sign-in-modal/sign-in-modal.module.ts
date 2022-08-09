import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInModalComponent } from './sign-in-modal.component';
import { ResetPasswordModalModule } from '../reset-password-modal/reset-password-modal.module';

@NgModule({
  declarations: [SignInModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ResetPasswordModalModule
  ]
})
export class SignInModalModule { }
