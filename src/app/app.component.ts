import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAIib4JxXb3EjbHdy0bnzEHnq8S9q--ZOw",
  authDomain: "covoiturage-test-5aa1b.firebaseapp.com",
  databaseURL: "https://covoiturage-test-5aa1b.firebaseio.com",
  projectId: "covoiturage-test-5aa1b",
  storageBucket: "covoiturage-test-5aa1b.appspot.com",
  messagingSenderId: "105073894401",
  appId: "1:105073894401:web:066115165a9f745fd28c00"
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(firebaseConfig);

  }

}
