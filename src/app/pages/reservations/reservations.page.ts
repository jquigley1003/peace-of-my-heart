import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  boardingResForm: FormGroup;
  showClient = true;
  showVet = true;
  showPet = true;
  vaccinesFiled: boolean;


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
      vetName: ['', Validators.required],
      vetPhone: ['', Validators.required],
      vetEmail: [''],
      vetVaccinesFiled: [''],
      pet1Name: ['', Validators.required],
      pet1Breed: ['', Validators.required],
      pet1Sex: ['', Validators.required],
      pet1Dob: ['', Validators.required],
      pet1Weight: ['', Validators.required],
      pet1Hair: ['', Validators.required],
      pet1SpayNeuter: ['', Validators.required],
      pet1RabiesDate: [''],
      pet1RabiesType: ['1 year'],
      pet1DhppDate: [''],
      pet1DhppType: ['1 year'],
      pet1BordetellaDate: [''],
      pet1FleaControl: [''],
      pet1Food: ['true', Validators.required],
      pet1Meds: ['false']
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

  ngOnInit() {
    this.vaccinesFiled = true;
  }

  toggleShowClientInfo() {
    this.showClient = !this.showClient;
  }

  toggleShowVetInfo() {
    this.showVet = !this.showVet;
  }

  toggleShowPetInfo() {
    this.showPet = !this.showPet;
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

  selectSex(event) {
    const testPet1Sex = this.boardingResForm.value.pet1Sex;
    console.log('Getting sex from form: ', testPet1Sex);
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


  onSubmitForm() {
    console.log('Form submitted');
  }

}
