import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  @ViewChild (IonDatetime) ionDatetime: IonDatetime;
  boardingResForm: FormGroup;
  dateArrivalString = '';
  dateArrivalValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  dateDepartureString = '';
  dateDepartureValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  showPicker = false;
  showClient = false;
  showVet = false;
  showPets = false;
  showPet1 = false;
  showPet2 = false;
  showRes = false;
  showAddServices = true;
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
    private formBuilder: FormBuilder
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
      pet1Name: ['', Validators.required],
      pet1Breed: ['', Validators.required],
      pet1Sex: ['', Validators.required],
      pet1Dob: ['', Validators.required],
      pet1Weight: ['', Validators.required],
      pet1Hair: [''],
      pet1SpayNeuter: ['', Validators.required],
      pet1RabiesDate: [''],
      pet1RabiesType: ['1 year'],
      pet1DhppDate: [''],
      pet1DhppType: ['1 year'],
      pet1BordetellaDate: [''],
      pet1FleaControl: [''],
      pet1Food: ['', Validators.required],
      pet1Meds: ['false'],
      pet1FoodInfo: ['', Validators.required],
      pet1MedInfo: ['None', Validators.required],

      pet2Name: [''],
      pet2Breed: [''],
      pet2Sex: [''],
      pet2Dob: [''],
      pet2Weight: [''],
      pet2Hair: [''],
      pet2SpayNeuter: [''],
      pet2RabiesDate: [''],
      pet2RabiesType: ['1 year'],
      pet2DhppDate: [''],
      pet2DhppType: ['1 year'],
      pet2BordetellaDate: [''],
      pet2FleaControl: [''],
      pet2Food: ['true'],
      pet2Meds: ['false'],
      pet2FoodInfo: [''],
      pet2MedInfo: ['None'],

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

  get pet1Name() {
    return this.boardingResForm.get('pet1Name');
  }

  get pet1Breed() {
    return this.boardingResForm.get('pet1Breed');
  }

  get pet1Sex() {
    return this.boardingResForm.get('pet1Sex');
  }

  get pet1SpayNeuter() {
    return this.boardingResForm.get('pet1SpayNeuter');
  }

  get pet1Dob() {
    return this.boardingResForm.get('pet1Dob');
  }

  get pet1Weight() {
    return this.boardingResForm.get('pet1Weight');
  }

  get pet1Food() {
    return this.boardingResForm.get('pet1Food');
  }

  get pet1FoodInfo() {
    return this.boardingResForm.get('pet1FoodInfo');
  }

  get pet1MedInfo() {
    return this.boardingResForm.get('pet1MedInfo');
  }

  get pet2Name() {
    return this.boardingResForm.get('pet2Name');
  }

  get pet2Breed() {
    return this.boardingResForm.get('pet2Breed');
  }

  get pet2Sex() {
    return this.boardingResForm.get('pet2Sex');
  }

  get pet2SpayNeuter() {
    return this.boardingResForm.get('pet2SpayNeuter');
  }

  get pet2Dob() {
    return this.boardingResForm.get('pet2Dob');
  }

  get pet2Weight() {
    return this.boardingResForm.get('pet2Weight');
  }

  get pet2Food() {
    return this.boardingResForm.get('pet2Food');
  }

  get pet2FoodInfo() {
    return this.boardingResForm.get('pet2FoodInfo');
  }

  get pet2MedInfo() {
    return this.boardingResForm.get('pet2MedInfo');
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
  }

  setToday() {
    this.dateArrivalString = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z'), 'h:mm a, MMM d, yyyy');
    this.dateDepartureString = format(parseISO(format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z'), 'h:mm a, MMM d, yyyy');
  }

  // async dateChanged(value) {
  //   this.dateArrivalValue = value;
  //   this.dateArrivalString = format(parseISO(value), 'h:mm a, MMM d, yyyy');
  //   this.showPicker = false;
  // }

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

  toggleShowPet1() {
    this.showPet1 = !this.showPet1;
  }

  toggleShowPet2() {
    this.showPet2 = !this.showPet2;
  }

  toggleShowResInfo() {
    this.showRes = !this.showRes;
  }

  toggleShowAddServices() {
    this.showAddServices = !this.showAddServices
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
    const testPetSex = this.boardingResForm.value.pet1Sex;
    console.log(`Getting ${currentPetSex} from form:`, event.detail.value);
  }

  selectSpayedNeutered(event) {
    const testPet1SpayNeuter = this.boardingResForm.value.pet1SpayNeuter;
    console.log('Getting spayed/neutered from form: ', testPet1SpayNeuter);
  }

  selectRabiesYear(event) {
    const testPet1RabiesType = this.boardingResForm.value.pet1RabiesType;
    console.log('Getting Rabies Type from form: ', testPet1RabiesType);
  }

  selectDhppYear(event) {
    const testPet1DhppType = this.boardingResForm.value.pet1DhppType;
    console.log('Getting DHPP Type from form: ', testPet1DhppType);
  }

  selectFleaControl(event) {
    const testPet1FleaControl = this.boardingResForm.value.pet1FleaControl;
    console.log('Getting value from form: ', testPet1FleaControl);
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

}
