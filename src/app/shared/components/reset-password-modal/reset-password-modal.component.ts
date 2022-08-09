import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';

import { AuthService } from '../../auth/auth.service';
import { LoadingService } from '../../notify/loading.service';
import { AlertService } from '../../notify/alert.service';
import { ToastService } from '../../notify/toast.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss'],
})
export class ResetPasswordModalComponent implements OnInit {
  userEmail: string = this.navParams.get('userEmail');
  passwordResetForm: FormGroup;
  passwordType = 'password';
  passwordShow = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private toastService: ToastService,
    private router: Router,
    private navParams: NavParams
  ) {
    this.passwordResetForm = this.formBuilder.group({
      email: [this.userEmail,
        (Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'))],
      });
   }

   get email() {
    return this.passwordResetForm.get('email');
  }
  ngOnInit() {}

  async onPasswordResetForm() {
    const email = this.passwordResetForm.value.email.trim();

    const loading = await this.loadingService.presentLoading(
      'Sending password reset email, Please Wait...', 'bubbles', 15000);
    this.authService.passwordReset(email)
    .then(async () => {
      this.loadingService.dismissLoading();
      await this.toastService.presentToast(
        'A password reset email was sent to you. Click the link in the email and follow the directions.',
        'middle',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('dismiss toast message');
            this.router.navigate(['/home']);
          }
        }],
        5000
      );
    }, async err => {
      this.loadingService.dismissLoading();
      await this.alertService.presentAlert(
        'Error in sending password reset email','please try again', err.message, ['OK']
      );
    });
    this.passwordResetForm.reset();
    await this.modalCtrl.dismiss();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
