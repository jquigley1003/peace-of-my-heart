import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../../auth/auth.service';
import { LoadingService } from '../../notify/loading.service';
import { AlertService } from '../../notify/alert.service';
import { ToastService } from '../../notify/toast.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  registerForm: FormGroup;
  passwordType = 'password';
  passwordShow = false;
  termsChecked = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', (Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'))],
      password: ['', Validators.required]
    });
   }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  ngOnInit() {}

  async onRegisterForm() {
    const firstName = this.registerForm.value.firstName.trim();
    const lastName = this.registerForm.value.lastName.trim();
    const email = this.registerForm.value.email.trim();
    const password = this.registerForm.value.password.trim();
    const acceptTOS = this.termsChecked;
    const data = {
      email,
      password,
      firstName,
      lastName,
      acceptTOS
    };

    await this.loadingService.presentLoading(
      'Registering in process...', 'bubbles', 15000);

    await this.authService.register(data)
    .then(async () => {
      this.loadingService.dismissLoading();
      await this.router.navigate(['/home']);
    }, async err => {
      this.loadingService.dismissLoading();
      await this.alertService.presentAlert(
        'Registering Did Not Complete','please try again', err.message, ['OK']
      );
    });
    console.log('Form data: ', data);
    this.registerForm.reset();
    await this.modalCtrl.dismiss();
  }

  onCheckEvent(event){
    if(event.detail.checked) {
      this.termsChecked = true;
      console.log(`Terms Checked: `, this.termsChecked);
    } else if (!event.detail.checked) {
      this.termsChecked = false;
      console.log(`Terms Checked: `, this.termsChecked);
    }
  }

  togglePassword() {
    if(this.passwordShow) {
      this.passwordShow = false;
      this.passwordType = 'password';
    } else {
      this.passwordShow = true;
      this.passwordType = 'text';
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
