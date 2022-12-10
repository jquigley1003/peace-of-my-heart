import { Injectable, OnDestroy } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';

import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Pet } from '../models/pet.model';
import { LoadingService } from '../notify/loading.service';
import { ToastService } from '../notify/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PetService implements OnDestroy {
  unsubscribePets = null;
  ngUnsubscribe = new Subject<void>();
  pets = [];
  userPets$: BehaviorSubject<Pet[]> = new BehaviorSubject<Pet[]>(null);

  constructor(
    private afStore: Firestore,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) { }

  async fetchUserPets(petParentId) {
    const q = query(collection (this.afStore, 'pets'), where('petParentId', '==' , petParentId));

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((pet) => {
    // // pet.data() is never undefined for query doc snapshots
    // console.log(pet.id, '=>', pet.data());
    // });
    this.unsubscribePets = onSnapshot(q, (querySnapshot) => {
      const pets = [];
      querySnapshot.forEach((petInfo) => {
          pets.push({
            ...petInfo.data(),
            petId: petInfo.id
          });
      });
      this.userPets$.next(pets);
      console.log('Pets: ', pets);
    });
  }

  getUserPets() {
    return this.userPets$.asObservable();
  }

  updatePet(path, data) {
    const docRef = doc
  }

  async stopSubscribing() {
    if(this.unsubscribePets) {
      await this.unsubscribePets();
      this.unsubscribePets = null;
      this.userPets$.next(null);
      this.userPets$.complete();
      console.log('Pets after stopSubscribing: ', this.unsubscribePets);
    } else {
      console.log('There is no attached listener to cancel');
    }
  }

  ngOnDestroy(): void {
    this.stopSubscribing();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
