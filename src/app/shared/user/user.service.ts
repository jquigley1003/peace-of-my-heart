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

  getAllUsers() {
    return this.allUsers$.asObservable();
  }

  createUserData(uid: string, email: string, firstName: string, lastName: string, acceptTOS: boolean) {
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
      },
      acceptTOS
    };

    const usersRef = doc(this.afStore, 'users', uid);
    return setDoc(usersRef, data);
    // NOTE: cloud function will automatically set the custom user claims (admin: false)
  }

  async makeUserAdmin(user: User) {
    const functions = getFunctions();
    await this.loadingService.presentLoading(
      '...please wait as we make this user an admin',
      'bubbles',
    10000,
    );
    httpsCallable(functions, 'addAdmin')(user)
      .then(async (resp: any) => {
        const data = await resp.data;
        console.log('Response from httpsCallable addAdmin: ', data);
        if(data.result) {
          this.msg = data.result;
        } else {
          this.msg = data.error;
        }
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          this.msg,
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000);
      })
      .catch(err => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          err.error,
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000);
      });
  }

  async removeAdminRole(user: User) {
    const functions = getFunctions();
    await this.loadingService.presentLoading(
      '...please wait as we remove this user as admin',
      'bubbles',
    10000,
    );
    httpsCallable(functions, 'removeAdmin')(user)
      .then(async (resp: any) => {
        const data = await resp.data;
        console.log('Response from httpsCallable removeAdmin: ', data);
        if(data.result) {
          this.msg = data.result;
        } else {
          this.msg = data.error;
        }
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          this.msg,
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000);
      })
      .catch((err) => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          err.error,
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000);
      });
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
