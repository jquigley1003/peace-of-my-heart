import { Injectable, OnDestroy } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { getFunctions, httpsCallable } from '@angular/fire/functions';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from '../models/user.model';
import { LoadingService } from '../notify/loading.service';
import { ToastService } from '../notify/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  msg: string;
  fetchUsers$: Observable<any[]>;
  allUsers$: BehaviorSubject<any[]>;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private afStore: Firestore,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {
    this.initializeGetUsers();
  }

  async initializeGetUsers() {
    if(!this.allUsers$) {
      this.allUsers$ = new BehaviorSubject<any>([]);
      await this.fetchUsers();
      this.fetchUsers$
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            res => {
            this.allUsers$.next(res);
          },
        err => console.log('Error retrieving Users: ', err)
        );
    } else {
    }
  }

  async fetchUsers() {
    const userRef = collection(this.afStore, 'users');
    this.fetchUsers$ = collectionData(userRef, {idField: 'id'}) as Observable<User[]>;
  }

  createUserData(uid: string, email: string, firstName: string, lastName: string) {
    const data: User = {
      uid,
      email,
      firstName,
      lastName,
      address: {
        street: null,
        unit: null,
        city: null,
        state: null,
        zipcode: null,
        country: null
      },
      phone: null,
      roles: {
        admin: false,
        active: false
      }
    };

    const usersRef = doc(this.afStore, 'users', uid);
    return setDoc(usersRef, data);
    // NOTE: cloud function will automatically set the custom user claims (admin: false)
  }

  async deleteUser(userId) {
    await this.loadingService.presentLoading(
      '...please wait while we delete this user',
      'bubbles',
    10000,
    );
    const userDocRef = doc(this.afStore, `users/${userId}`);
    deleteDoc(userDocRef)
      .then(() => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          'The user has been deleted!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000 );
      })
      .catch(err => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          'You do not have the credentials to delete users!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
