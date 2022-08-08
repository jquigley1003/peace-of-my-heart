import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('newDog') newDogRef: ElementRef;

  newDogAnimation: Animation;

  constructor(
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.newDogAnimation = this.animationCtrl.create('nameHere')
    .addElement(this.newDogRef.nativeElement)
    .duration(2000)
    .fromTo('opacity', '0', '1')
    .fromTo('transform', 'translateX(-25vw) scale(0)', 'translateX(0px) scale(1)');
  }

  ionViewDidEnter() {
    this.newDogAnimation.play();
  }

}
