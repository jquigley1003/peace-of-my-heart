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
  spayNeuter1: boolean;
  rabiesType1: string;
  dhppType1: string;
  fleaControl1: boolean;

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
      vetName1: ['', Validators.required],
      vetPhone1: ['', Validators.required],
      vetEmail1: [''],
      petName1: ['', Validators.required],
      petBreed1: ['', Validators.required],
      petSex1: ['', Validators.required],
      petDob1: ['', Validators.required],
      petWeight1: ['', Validators.required],
      petHair1: ['', Validators.required],
      petSpayNeuter1: ['', Validators.required],
      rabiesDate1: [''],
      dhppDate1: [''],
      bordetellaDate1: ['']
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

  get petName1() {
    return this.boardingResForm.get('petName1');
  }

  get petBreed1() {
    return this.boardingResForm.get('petBreed1');
  }

  get petSex1() {
    return this.boardingResForm.get('petSex1');
  }

  get petDob1() {
    return this.boardingResForm.get('petDob1');
  }

  get petWeight1() {
    return this.boardingResForm.get('petDob1');
  }

  get vetName1() {
    return this.boardingResForm.get('vetName1');
  }

  get vetPhone1() {
    return this.boardingResForm.get('vetPhone1');
  }

  ngOnInit() {
    this.rabiesType1 = '1 year';
    this.dhppType1 = '1 year';
    this.fleaControl1 = true;
  }

  ionViewWillLoad() {
    this.vaccinesFiled = true;
    this.spayNeuter1 = true;
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

  vaccinesFiledSelect(event) {
    this.vaccinesFiled = (event.detail.checked === true) ? true : false;
    console.log('vaccines are on file: ', this.vaccinesFiled);
  }

  spayNeuterSelect(event) {
    this.spayNeuter1 = (event.detail.checked === true) ? true : false;
    console.log('this pet 1 is spayed or neutered: ', this.spayNeuter1);
    const testPetSpayNeuter1 = this.boardingResForm.value.petSpayNeuter1;
    console.log('Getting value from form: ', testPetSpayNeuter1);
  }

  selectRabiesYear(event) {
    this.rabiesType1 = (event.detail.value === '1 year') ? '1 year' : '3 year';
    console.log('this pet 1 rabies type is: ', this.rabiesType1);
  }

  selectDhppYear(event) {
    this.dhppType1 = (event.detail.value === '1 year') ? '1 year' : '3 year';
    console.log('this pet 1 dhpp type is: ', this.dhppType1);
  }

  fleaControlSelect(event) {
    this.fleaControl1 = (event.detail.checked === true) ? true : false;
    console.log('this pet 1 has flea control: ', this.fleaControl1);
  }

  onSubmitForm() {
    console.log('Form submitted');
  }

}
