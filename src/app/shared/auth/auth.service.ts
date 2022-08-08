import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification,
  signInWithEmailAndPassword, sendPasswordResetEmail,
  signOut, updateProfile } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UserService } from '../user/user.service';
import { ToastService } from '../notify/toast.service';
import { AlertService } from '../notify/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  constructor() { }

  async register(newUser) {
    const fullName = newUser.firstName + ' ' + newUser.lastName;

    const credential = await createUserWithEmailAndPassword(this.afAuth, newUser.email, newUser.password);
    await updateProfile(credential.user, { displayName: fullName });
    await this.userService.createUserData(credential.user.uid, newUser.email, newUser.firstName, newUser.lastName)
    .then(async () => {
      // console.log('User was registered successfully');
      await this.alertService.presentAlert(
        `Thank You For Registering ${fullName}!`,
        `You are now signed up for We Are One Gaia, using the email address: ${newUser.email}`,
        'Remember, access to each module requires a donation.',
        ['OK']
      );
    });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
