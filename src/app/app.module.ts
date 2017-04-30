// Main Declarations
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { PatiApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Root
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ActiveTopicsPage } from '../pages/active-topics/active-topics';
import { FavoriteTopicsPage } from '../pages/favorite-topics/favorite-topics';

// Sub pages
import { AreaPage } from '../pages/area-page/area';
import { UserInfoPage } from '../pages/userinfo-page/userinfo';

// Templates
import { AreaTemplate, AreasHeader, AreaSeparator } from '../components/templates/area-templates';
import { TopicTemplate, TopicsHeader, StickyHeader } from '../components/templates/topic-templates';

// Providers
import { PatiService } from '../providers/pati.service';
import { Authentication } from '../providers/auth.service';

@NgModule({
  declarations: [
    PatiApp,
    ActiveTopicsPage,
    FavoriteTopicsPage,
    HomePage,
    TabsPage,
    AreaTemplate,
    AreasHeader,
    AreaSeparator,
    LoginPage,
    AreaPage,
    UserInfoPage,
    TopicsHeader,
    TopicTemplate,
    StickyHeader
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(PatiApp, {
      platforms: {
        ios: {
          pageTransition: 'ios-transition',
          swipeBackEnabled: true
        },
        android: {
          pageTransition: 'md-transition',
          swipeBackEnabled: true
        }
      }
    }),
    IonicStorageModule.forRoot({
      name: 'patiDB',
      storeName: 'keypairvalues',
      driverOrder: ['indexeddb', 'websql', 'sqlite']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PatiApp,
    ActiveTopicsPage,
    FavoriteTopicsPage,
    HomePage,
    TabsPage,
    LoginPage,
    AreaPage,
    UserInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PatiService,
    Authentication
  ]
})
export class AppModule {
}
