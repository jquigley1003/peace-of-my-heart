import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
  constructor() {}
}
