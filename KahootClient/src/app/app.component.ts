import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor() {
  }

  // To clear local storages when the Angular app is closed,
  // @HostListener('window:unload', ['$event'])
  // clearLocalStorageOnExit(event: Event): void {
  //   localStorage.removeItem('Login');
  //   localStorage.removeItem('Role');
  //   localStorage.removeItem('userId');
  //   localStorage.removeItem('userMail');
  //   localStorage.removeItem('photoURL');
  //   localStorage.removeItem('Guest');
  // }
}

