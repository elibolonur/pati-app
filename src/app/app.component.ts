import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class PatiApp {
  rootPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              storage: Storage) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      storage.ready().then(() => {
        storage.get('authCookie').then((cookie) => {
          if (cookie) {
            this.rootPage = TabsPage;
          } else {
            this.rootPage = LoginPage;
          }
        })
      });
    });
  }
}
