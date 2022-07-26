import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';

import { format, parseISO } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Pet } from 'src/app/shared/models/pet.model';

import { PetService } from 'src/app/shared/pet/pet.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { SignInModalComponent } from 'src/app/shared/components/sign-in-modal/sign-in-modal.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit, OnDestroy {
  @ViewChild (IonDatetime) ionDatetime: IonDatetime;
  signedIn: boolean;
  activeCustomer: boolean;
  ngUnsubscribe = new Subject<void>();
  clientPets: Pet[] = [];
  petHeader: string;
  boardingResForm: FormGroup;
  petDobString = '';
  petRabiesString = '';
  petDhppString = '';
  petBordetellaString = '';
  dateArrivalString = '';
  dateArrivalValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  dateDepartureString = '';
  dateDepartureValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  showPicker = false;
  showClient = false;
  showVet = false;
  showPets = false;
  showRes = false;
  showAddServices = false;
  showRefresh = false;
  vaccinesFiled: boolean;
  consentFormFiled: boolean;
  exitBath: boolean;
  fieldTripFull: boolean;
  fieldTripHalf: boolean;
  patioDate: boolean;
  individualAttention: boolean;
  bakedTreats: boolean;
  iceCreamCups: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) {
    this.boardingResForm = this.formBuilder.group({
      clientFirstName: ['', Validators.required],
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
      pets: this.formBuilder.array([]),
      arrivalDate: ['', Validators.required],
      arrivalPickup: ['false'],
      departureDate: ['', Validators.required],
      departureDropOff: ['false'],
      specialInstructions: [''],
      consentFormFiled: ['false'],
      exitBath: ['false'],
      fieldTripFull: ['false'],
      howManyFullTrips: ['0'],
      bathFieldTripFull: [''],
      fieldTripHalf: ['false'],
      howManyHalfTrips: ['0'],
      bathFieldTripHalf: [''],
      patioDate: ['false'],
      howManyPatioDates: ['0'],
      individualAttention: ['false'],
      howManyIndividuals: ['0'],
      bakedTreats: ['false'],
      howManyBakedTreats: ['0'],
      iceCreamCups: ['false'],
      howManyIceCreamCups: ['0']
    });
  }

  get clientFirstName() {
    return this.boardingResForm.get('clientFirstName');
  }

  get clientLastName() {
    return this.boardingResForm.get('clientLastName');
  }

  get clientStreet() {
    return this.boardingResForm.get('clientStreet');
  }

  get clientCity() {
    return this.boardingResForm.get('clientCity');
  }

  get clientState() {
    return this.boardingResForm.get('clientState');
  }

  get clientZip() {
    return this.boardingResForm.get('clientZip');
  }

  get clientEmail() {
    return this.boardingResForm.get('clientEmail');
  }

  get clientPhone1() {
    return this.boardingResForm.get('clientPhone1');
  }

  get clientPhone2() {
    return this.boardingResForm.get('clientPhone2');
  }

  get emergencyName1() {
    return this.boardingResForm.get('emergencyName1');
  }

  get emergencyPhone1() {
    return this.boardingResForm.get('emergencyPhone1');
  }

  get emergencyPhone2() {
    return this.boardingResForm.get('emergencyPhone2');
  }

  get emergencyMaxAmount() {
    return this.boardingResForm.get('emergencyMaxAmount');
  }

  get vetName() {
    return this.boardingResForm.get('vetName');
  }

  get vetPhone() {
    return this.boardingResForm.get('vetPhone');
  }

  get pets(){
    return this.boardingResForm.controls.pets as FormArray;
  }

  get arrivalDate() {
    return this.boardingResForm.get('arrivalDate');
  }

  get departureDate() {
    return this.boardingResForm.get('departureDate');
  }

  ngOnInit() {
    this.vaccinesFiled = true;
    this.setToday();
    this.initializeUserPets();
    this.initializeUser();
  }

  setToday() {
    this.dateArrivalString = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z'), 'h:mm a, MMM d, yyyy');
    this.dateDepartureString = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z'), 'h:mm a, MMM d, yyyy');
  }

  initializeUser() {
    this.authService.getCurrentUserData()
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data) {
          this.signedIn = !!data;
          this.activeCustomer = data.roles.active;
          // console.log('reservation user is: ', data);
        } else {
          this.signedIn = false;
          this.activeCustomer = false;
          // console.log('reservation user is: ', data);
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
          // console.log('clientPets in initializeUserPets: ', this.clientPets);
        });
    } else {
      this.showRefresh = false;
      this.addPets();
    }

  }

  async addPets() {
    this.clientPets.forEach(pet => {
      // console.log('addPets result: ', pet);
      this.getPetDob(pet.petDob);
      this.getPetRabies(pet.petRabiesDate);
      this.getPetDhpp(pet.petDhppDate);
      this.getPetBordetella(pet.petBordetellaDate);
      const petForm = this.formBuilder.group({
        petHeader: [pet.petName],
        petName: [pet.petName, Validators.required],
        petBreed: [pet.petBreed, Validators.required],
        petSex: [pet.petSex, Validators.required],
        petSpayNeuter: [pet.petSpayNeuter, Validators.required],
        petDob: [this.petDobString, Validators.required],
        petWeight: [pet.petWeight, Validators.required],
        petHair: [pet.petHair, Validators.required],
        petRabiesDate: [this.petRabiesString],
        petRabiesType: [pet.petRabiesType],
        petDhppDate: [this.petDhppString],
        petDhppType: [pet.petDhppType],
        petBordetellaDate: [this.petBordetellaString],
        petFleaControl: [pet.petFleaControl],
        petFood: [pet.petFood, Validators.required],
        petMeds: [pet.petMeds],
        petFoodInfo: [pet.petFoodInfo, Validators.required],
        petMedInfo: [pet.petMedInfo, Validators.required]
      });
      this.pets.push(petForm);
    });
  }

  removePet(index) {
    this.pets.removeAt(index);
    if (this.pets.value.length === 0) {
      this.showRefresh = true;
    }
  }

  getPetDob(value) {
    const petDob = new Timestamp(value.seconds , value.nanoseconds).toDate().toISOString();
    this.petDobString = format(parseISO(petDob), 'MMM d, yyyy');
    // console.log('pet DOB is: ', this.petDobString);
  }

  getPetRabies(value) {
    const petRabies = new Timestamp(value.seconds , value.nanoseconds).toDate().toISOString();
    this.petRabiesString = format(parseISO(petRabies), 'MMM d, yyyy');
    // console.log('pet Rabies Date is: ', this.petRabiesString);
  }

  getPetDhpp(value) {
    const petDhpp = new Timestamp(value.seconds , value.nanoseconds).toDate().toISOString();
    this.petDhppString = format(parseISO(petDhpp), 'MMM d, yyyy');
    // console.log('pet Dhpp Date is: ', this.petDhppString);
  }

  getPetBordetella(value) {
    const petBordetella = new Timestamp(value.seconds , value.nanoseconds).toDate().toISOString();
    this.petBordetellaString = format(parseISO(petBordetella), 'MMM d, yyyy');
    // console.log('pet Bordetella Date is: ', this.petBordetellaString);
  }

  modalArrivalDateChanged(value) {
    this.dateArrivalValue = value;
    this.dateArrivalString = format(parseISO(value), 'h:mm a, MMM d, yyyy');
    this.boardingResForm.value.arrivalDate = this.dateArrivalString;
    console.log(this.boardingResForm.value.arrivalDate);
  }

  modalDepartureDateChanged(value) {
    this.dateDepartureValue = value;
    this.dateDepartureString = format(parseISO(value), 'h:mm a, MMM d, yyyy');
    this.boardingResForm.value.departureDate = this.dateDepartureString;
    console.log(this.boardingResForm.value.departureDate);
  }

  async close() {
    await this.ionDatetime.cancel(true);
  }

  async select() {
    await this.ionDatetime.confirm(true);
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

  toggleShowResInfo() {
    this.showRes = !this.showRes;
  }

  toggleShowAddServices() {
    this.showAddServices = !this.showAddServices;
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
    const testVaccinesFiled = this.boardingResForm.value.vetVaccinesFiled;
    console.log('Getting value from form: ', testVaccinesFiled);
  }

  selectSex(event, petSex) {
    const currentPetSex = petSex;
    // console.log(event);
    console.log(`Getting ${currentPetSex} from form:`, event.detail.value);
  }

  selectSpayedNeutered(event, petSpayNeuter) {
    const currentPetSpayNeuter = petSpayNeuter;
    console.log(`Getting ${currentPetSpayNeuter} from form: `, event.detail.value);
  }

  selectRabiesYear(event) {
    const testPet1RabiesType = this.boardingResForm.value.pet1RabiesType;
    console.log('Getting Rabies Type from form: ', testPet1RabiesType);
  }

  selectDhppYear(event) {
    const testPet1DhppType = this.boardingResForm.value.pet1DhppType;
    console.log('Getting DHPP Type from form: ', testPet1DhppType);
  }

  selectFleaControl(event, petFleaControl) {
    const testPetFleaControl = petFleaControl;
    console.log(`Getting ${testPetFleaControl} from form: `, event.detail.value);
  }

  selectFood(event) {
    const testPet1Food = this.boardingResForm.value.pet1Food;
    console.log('Getting pet1Food value from form: ', testPet1Food);
  }

  selectMeds(event) {
    const testPet1Meds = this.boardingResForm.value.pet1Meds;
    console.log('Getting pet1Meds value from form: ', testPet1Meds);
  }

  selectPickup(event) {
    const testArrivalPickup = this.boardingResForm.value.arrivalPickup;
    console.log('Getting arrivalPickup value from form: ', testArrivalPickup);
  }

  selectDropOff(event) {
    const testDepartureDropOff = this.boardingResForm.value.departureDropOff;
    console.log('Getting departureDropOff value from form: ', testDepartureDropOff);
  }

  selectConsentFormFiled(event) {
    this.consentFormFiled = (event.detail.checked === true) ? true : false;
    console.log('consent form is on file: ', this.consentFormFiled);
    const testConsentFormFiled = this.boardingResForm.value.consentFormFiled;
    console.log('Getting value from form: ', testConsentFormFiled);
  }

  selectExitBath(event) {
    const testExitBath = this.boardingResForm.value.exitBath;
    console.log('Getting exitBath value from form: ', testExitBath);
  }

  selectFieldTripFull(event) {
    this.fieldTripFull = (event.detail.checked === true) ? true : false;
    console.log('Field Trip Full Day: ', this.fieldTripFull);
    const testFieldTripFull = this.boardingResForm.value.fieldTripFull;
    console.log('Getting value from form: ', testFieldTripFull);
  }

  selectBathTripFull(event) {
    const testFtFullBath = this.boardingResForm.value.bathFieldTripFull;
    console.log('Getting bathFieldTripFull value from form: ', testFtFullBath);
  }

  selectFieldTripHalf(event) {
    this.fieldTripHalf = (event.detail.checked === true) ? true : false;
    console.log('Field Trip Half Day: ', this.fieldTripHalf);
    const testFieldTripHalf = this.boardingResForm.value.fieldTripHalf;
    console.log('Getting value from form: ', testFieldTripHalf);
  }

  selectBathTripHalf(event) {
    const testFtHalfBath = this.boardingResForm.value.bathFieldTripHalf;
    console.log('Getting bathFieldTripHalf value from form: ', testFtHalfBath);
  }

  selectPatioDate(event) {
    const testPatioDate = this.boardingResForm.value.patioDate;
    console.log('Getting patioDate value from form: ', testPatioDate);
  }

  selectIndividualAttention(event) {
    const testIndividualAttention = this.boardingResForm.value.individualAttention;
    console.log('Getting IndividualAttention value from form: ', testIndividualAttention);
  }

  selectBakedTreats(event) {
    const testBakedTreats = this.boardingResForm.value.bakedTreats;
    console.log('Getting BakedTreats value from form: ', testBakedTreats);
  }

  selectIceCreamCups(event) {
    const testIceCreamCups = this.boardingResForm.value.iceCreamCups;
    console.log('Getting IceCreamCups value from form: ', testIceCreamCups);
  }

  onSubmitForm() {
    console.log('Form submitted: ', this.boardingResForm.value);
  }

  async presentSignInModal() {
    const modal = await this.modalCtrl.create({
      component: SignInModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
