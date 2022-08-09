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
  user$: Observable<User | null>;
  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  currentUserData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentUser;
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  error = null;
  ngUnsubscribe: Subject<void>;

  constructor(
    private afAuth: Auth,
    private afStore: Firestore,
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private alertService: AlertService
  ) {
    this.initializeAuth();
   }

  async initializeAuth() {
    onAuthStateChanged(this.afAuth, async userInfo => {
      // console.log('authservice USER Changed: ', userInfo);
      if(userInfo) {
        this.ngUnsubscribe = new Subject<void>();
        this.currentUser$.next(userInfo); // user from firebase authentication
        await userInfo.getIdTokenResult().then((res) =>{
          this.isAdmin$.next(!!res.claims.admin);
          // console.log('authservice idTokenResult for admin is: ', res.claims.admin);
        });
        this.retrieveCurrentUserData(userInfo);
      } else {
        this.currentUser = null;
        this.currentUser$.next(null);
        this.currentUserData$.next(null);
        this.isAdmin$.next(false);
      }
    });
  }

  retrieveCurrentUserData(userInfo) {
    const userDoc = doc(this.afStore, `users/${userInfo.uid}`);
        docData(userDoc, {idField: 'id'}).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(data => {
          if(data) {
            // console.log('auth service userdata from firestore: ', data);
            this.currentUser = data;
            this.currentUserData$.next(data);  // user data from firebase firestore
          } else {
            this.currentUser = null;
            this.currentUserData$.next(null);
          }
        });
  }

  getCurrentUser() {
    return this.currentUser$.asObservable();
  }

  getCurrentUserData() {
    return this.currentUserData$.asObservable();
  }

  getIsAdmin() {
    return this.isAdmin$.asObservable();
  }

  uid() {
    return this.currentUserData$
      .pipe(
        take(1),
        map(u => u && u.uid)
      )
      .toPromise();
  }

  async register(newUser) {
    const fullName = newUser.firstName + ' ' + newUser.lastName;

    const credential = await createUserWithEmailAndPassword(this.afAuth, newUser.email, newUser.password);
    await updateProfile(credential.user, { displayName: fullName });
    await this.userService.createUserData(credential.user.uid, newUser.email, newUser.firstName, newUser.lastName, newUser.acceptTOS)
    .then(async () => {
      // console.log('User was registered successfully');
      await this.alertService.presentAlert(
        `Thank You For Registering ${fullName}!`,
        `You are now a potential client of Peace of My Heart, using the email address: ${newUser.email}`,
        'Please contact Stephen Walter to ensure your status is active.',
        ['OK']
      );
    });
  }

  async signIn(email: string, password: string ) {
    return await signInWithEmailAndPassword(this.afAuth, email, password);
  }

  async signOut() {
    this.stopObs();
    await signOut(this.afAuth);
    this.router.navigateByUrl('/intro', {replaceUrl: true});
  }

  async sendEmailVerification(userId) {
    return await sendEmailVerification(userId);
  }

  async passwordReset(userEmail) {
    return await sendPasswordResetEmail(this.afAuth, userEmail);
  }

  stopObs() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnDestroy(): void {
    this.stopObs();
  }

  private handleError(error: Error) {
    console.error(error);
    this.toastService.presentToast(
      error.message,
      'middle',
      [{
        text: 'OK',
        role: 'cancel',
      }], 15000);
  }
}
