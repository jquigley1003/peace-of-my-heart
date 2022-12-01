import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { format, parseISO } from 'date-fns';

import { User } from 'src/app/shared/models/user.model';
import { Pet } from 'src/app/shared/models/pet.model';
import { SignInModalComponent } from 'src/app/shared/components/sign-in-modal/sign-in-modal.component';
import { PetModalComponent } from 'src/app/shared/modals/pet-modal/pet-modal.component';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { PetService } from 'src/app/shared/pet/pet.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.page.html',
  styleUrls: ['./enrollment.page.scss'],
})
export class EnrollmentPage implements OnInit, OnDestroy {
  enrollmentForm: FormGroup;
  ngUnsubscribe = new Subject<void>();
  signedIn: boolean;
  showClient = false;
  showVet = false;
  showPets = false;
  vaccinesFiled: boolean;
  client: User;
  clientPets: Pet[] = [];
  petDobString: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private petService: PetService,
  ) {
    this.enrollmentForm = this.formBuilder.group({
      clientFirstName: ['' , Validators.required],
      clientLastName: ['', Validators.required],
      clientSpousePartner: [''],
      clientStreet: ['', Validators.required],
      clientCity: ['', Validators.required],
      clientState: ['', Validators.required],
      clientZip: ['', Validators.required],
      clientEmail: ['', (Validators.required, Validators.pattern('.+\@.+\..+'))],
      clientPhone1: ['', (Validators.required, Validators.pattern('^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$'))],
      clientPhone2: ['', Validators.pattern('^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$')],
      emergencyName1: ['', Validators.required],
      emergencyPhone1: ['', (Validators.required, Validators.pattern('^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$'))],
      emergencyName2: [''],
      emergencyPhone2: ['', Validators.pattern('^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$')],
      emergencyMaxAmount: ['', Validators.required],
      vetName: ['', Validators.required],
      vetPhone: ['', Validators.required],
      vetEmail: [''],
      vetVaccinesFiled: [''],
      pets: this.formBuilder.array([])
    });
  }

  get clientFirstName() {
    return this.enrollmentForm.get('clientFirstName');
  }

  get clientLastName() {
    return this.enrollmentForm.get('clientLastName');
  }

  get clientStreet() {
    return this.enrollmentForm.get('clientStreet');
  }

  get clientCity() {
    return this.enrollmentForm.get('clientCity');
  }

  get clientState() {
    return this.enrollmentForm.get('clientState');
  }

  get clientZip() {
    return this.enrollmentForm.get('clientZip');
  }

  get clientEmail() {
    return this.enrollmentForm.get('clientEmail');
  }

  get clientPhone1() {
    return this.enrollmentForm.get('clientPhone1');
  }

  get clientPhone2() {
    return this.enrollmentForm.get('clientPhone2');
  }

  get emergencyName1() {
    return this.enrollmentForm.get('emergencyName1');
  }

  get emergencyPhone1() {
    return this.enrollmentForm.get('emergencyPhone1');
  }

  get emergencyPhone2() {
    return this.enrollmentForm.get('emergencyPhone2');
  }

  get emergencyMaxAmount() {
    return this.enrollmentForm.get('emergencyMaxAmount');
  }

  get vetName() {
    return this.enrollmentForm.get('vetName');
  }

  get vetPhone() {
    return this.enrollmentForm.get('vetPhone');
  }

  get pets(){
    return this.enrollmentForm.controls.pets as FormArray;
  }

  ngOnInit() {
    this.initializeUser();
    this.initializeUserPets();
  }

  async initializeUser() {
    this.authService.getCurrentUserData()
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data) {
          this.client = data;
          this.signedIn = !!data;
          console.log('enrollment user is: ', data);
          this.enrollmentForm.setValue({
            clientFirstName: this.client.firstName,
            clientLastName: this.client.lastName,
            clientSpousePartner: 'empty',
            clientStreet: this.client.address.street,
            clientCity: this.client.address.city,
            clientState: 'GA',
            clientZip: this.client.address.zipcode,
            clientEmail: this.client.email,
            clientPhone1: this.client.phone,
            clientPhone2: '',
            emergencyName1: '',
            emergencyPhone1: '',
            emergencyName2: '',
            emergencyPhone2: '',
            emergencyMaxAmount: 1000,
            vetName: '',
            vetPhone: '',
            vetEmail: '',
            vetVaccinesFiled: false,
            pets: this.formBuilder.array([])
         });
        } else {
          this.signedIn = false;
          console.log('enrollment user is: ', data);
        }
      });
  }

  async initializeUserPets() {
    if (this.clientPets === null || this.clientPets.length === 0) {
      this.petService.getUserPets()
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data => {
          this.clientPets = data;
          this.addPets();
          console.log('clientPets in initializeUserPets: ', this.clientPets);
        });
    } else {
      this.clientPets = [];
      // this.addPets();
    }

  }

  async addPets() {
    this.clientPets.forEach(pet => {
      this.getPetDob(pet.petDob);
      // console.log('addPets result: ', pet);
      const petForm = this.formBuilder.group({
        petHeader: [pet.petName],
        petName: [pet.petName, Validators.required],
        petBreed: [pet.petBreed, Validators.required],
        petSex: [pet.petSex, Validators.required],
        petSpayNeuter: [pet.petSpayNeuter, Validators.required],
        petDob: [this.petDobString, Validators.required],
        petWeight: [pet.petWeight, Validators.required],
        petHair: [pet.petHair, Validators.required],
        petRabiesDate: [pet.petRabiesDate],
        petRabiesType: [pet.petRabiesType],
        petDhppDate: [pet.petDhppDate],
        petDhppType: [pet.petDhppType],
        petBordetellaDate: [pet.petBordetellaDate],
        petFleaControl: [pet.petFleaControl],
        petFood: [pet.petFood, Validators.required],
        petMeds: [pet.petMeds],
        petFoodInfo: [pet.petFoodInfo, Validators.required],
        petMedInfo: [pet.petMedInfo, Validators.required]
      });
      this.pets.push(petForm);
    });
  }

  getPetDob(value) {
    this.petDobString = new Timestamp(value.seconds , value.nanoseconds).toDate().toISOString().split('T')[0];
    // console.log('pet DOB is: ', this.petDobString);
  }

  updatePet(pet) {
    this.petService.updatePet(pet);
  }

  async presentPetModal(pet) {
    const modal = await this.modalCtrl.create({
      component: PetModalComponent,
      componentProps: {
        pet
      }
    });
    return await modal.present();
  }

  async presentSignInModal() {
    const modal = await this.modalCtrl.create({
      component: SignInModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  toggleShowClientInfo() {
    this.showClient = !this.showClient;
  }

  toggleShowVetInfo() {
    this.showVet = !this.showVet;
  }

  toggleShowPetInfo() {
    this.showPets = !this.showPets;
  }

  addHyphens(e) {
    const key = e.charCode || e.keyCode || 0;
       if (key !== 8 && key !== 9) {
           if (e.target.value.length === 3) {
               e.target.value = e.target.value + '-';
           }
           if (e.target.value.length === 7) {
            e.target.value = e.target.value + '-';
           }
       }
       return (key === 8 || key === 9 || key === 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
  }

  selectVaccinesFiled(event) {
    this.vaccinesFiled = (event.detail.checked === true) ? true : false;
    console.log('vaccines are on file: ', this.vaccinesFiled);
    const testVaccinesFiled = this.enrollmentForm.value.vetVaccinesFiled;
    console.log('Getting value from form: ', testVaccinesFiled);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
