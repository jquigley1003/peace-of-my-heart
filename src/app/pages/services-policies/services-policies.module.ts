import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesPoliciesPageRoutingModule } from './services-policies-routing.module';

import { ServicesPoliciesPage } from './services-policies.page';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesPoliciesPageRoutingModule,
    FooterModule
  ],
  declarations: [ServicesPoliciesPage]
})
export class ServicesPoliciesPageModule {}
