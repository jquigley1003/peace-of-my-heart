import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from './shared/models/user.model';
import { AlertService } from './shared/notify/alert.service';
import { AuthService } from './shared/auth/auth.service';
import { ToastService } from './shared/notify/toast.service';
import { RegisterModalComponent } from './shared/components/register-modal/register-modal.component';
import { SignInModalComponent } from './shared/components/sign-in-modal/sign-in-modal.component';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser = null;
  currentUserData = null;
  userFullName = null;
  currentUser$: Observable<User>;
  ngUnsubscribe = new Subject<void>();
  isAdmin = false;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      ionicIcon: 'home-outline',
      color: 'red-icon'
    },
    {
      title: 'Services & Policies',
      url: '/services-policies',
      ionicIcon: 'paw-outline',
      color: 'orange-icon'
    },
    {
      title: 'Enrollment',
      url: '/enrollment',
      ionicIcon: 'school-outline',
      color: 'yellow-icon'
    },
    {
      title: 'Reservations',
      url: '/reservations',
      ionicIcon: 'calendar-number-outline',
      color: 'green-icon'
    },
    {
      title: 'Gallery',
      url: '/gallery',
      ionicIcon: 'image-outline',
      color: 'blue-icon'
    },
    {
      title: 'Pet Videos',
      url: '/pet-videos',
      ionicIcon: 'videocam-outline',
      color: 'purple-icon'
    }
  ];
  constructor(
    private swUpdate: SwUpdate,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private toastService: ToastService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.initializeUser();
    this.initializeUserData();
    this.initializeIsAdmin();
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(data => {
        // console.log('swUpdate info: ',data);
        if(data.type.valueOf() === 'VERSION_READY') {
          this.alertService.presentAlert(
            'App Update!',
            'Updated version of Peace of My Heart app is available.',
            'Load Improved Version?',
            [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
              },
              {
                text: 'Yes',
                handler: () => {
                  window.location.reload();
                }
              }
            ]
          );
        }
      });
    }
  }

  // This will get user from Firebase Authentication
  async initializeUser() {
    this.authService.getCurrentUser()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async data => {
        if (data) {
          this.currentUser = data;
          // console.log('app component currentUser: ',this.currentUser);
          // console.log('app component currentUser id is: ', this.currentUser.uid);
        } else {
          this.currentUser = null;
          // console.log('app component - no current user: ');
          // console.log('app component currentUser: ',this.currentUser);
        }
      });
  }

  // This will get user data from Firebase Firestore
  async initializeUserData() {
    this.authService.getCurrentUserData()
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async data => {
        if(data) {
          this.userFullName = await data.firstName + ' ' + data.lastName;
          // console.log('app component currentUserData fullname = ', this.userFullName);
        } else {
          this.userFullName = null;
          // console.log('app component currentUserData fullname = ', this.userFullName);
        }
      });
  }

  initializeIsAdmin() {
    this.authService.getIsAdmin()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(async data => {
      if(data) {
        this.isAdmin = data;
        // console.log('app component isAdmin = ', this.isAdmin);
      } else {
        this.isAdmin = false;
        // console.log('app component isAdmin = ', this.isAdmin);
      }
    });
  }

  async presentRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: RegisterModalComponent,
      componentProps: {}
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

  async signOut() {
    await this.authService.signOut()
    .then(async () => {
      await this.toastService.presentToast(
        'You Have Signed Out.',
        'middle',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            // console.log('dismiss toast message');
            this.router.navigate(['/home']);
            // window.location.reload();
          }
        }],
        3000
      );
      // setTimeout(
      //   () => window.location.reload(), 3000
      // );
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
