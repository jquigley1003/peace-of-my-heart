import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonContent, ModalController, NavParams } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Pet } from '../../models/pet.model';
import { PetService } from '../../pet/pet.service';
import { ToastService } from '../../notify/toast.service';
import { AlertService } from '../../notify/alert.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-pet-modal',
  templateUrl: './pet-modal.component.html',
  styleUrls: ['./pet-modal.component.scss'],
})
export class PetModalComponent implements OnInit {
  pet: any = this.navParams.get('pet');
  currentPetId = this.pet.petId;
  petForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private petService: PetService,
    private toastService: ToastService,
    private alertService: AlertService) {
      this.petForm = this.formBuilder.group({
        petName: [this.pet.petName],
        animal: ['dog'],
        breed: ['mix'],
        color: ['blue'],
        age: [11],
        parents: [this.pet.petParentId]
      });
    }

  ngOnInit() {}

  async onUpdatePet() {
    const pet = this.petForm.value;
    const data = {
      petName: pet.petName,
    };

    if(this.currentPetId === '') {
      await this.petService.updatePet('pets/', data);
      await this.toastService.presentToast(
        pet.petName +' has been added as family pet',
        'top',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('dismiss toast message');
          }
        }], 3000 );
      await this.petForm.reset();
      await this.modalCtrl.dismiss();
    } else {
      await this.petService.updatePet('pets/'+ this.currentPetId, data);
      await this.toastService.presentToast(
        'The Family Pet profile for '+ pet.petName +' has been updated!',
        'top',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('dismiss toast message');
          }
        }], 3000 );
      await this.petForm.reset();
      await this.modalCtrl.dismiss();
    }

  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
