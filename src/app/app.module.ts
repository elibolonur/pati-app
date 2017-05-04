// Main Declarations
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { PatiApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Root
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ActiveTopicsPage } from '../pages/active-topics/active-topics';
import { FavoriteTopicsPage } from '../pages/favorite-topics/favorite-topics';
import { PmPage } from '../pages/pm/pm';


// Sub pages
import { AreaPage } from '../pages/area-page/area';
import { TopicPage } from '../pages/topic-page/topic';
import { UserInfoPage } from '../pages/userinfo-page/userinfo';
import { PmReadPage } from "../pages/pm-read/pmread";

// Templates
import { AreaTemplate, AreasHeader, AreaSeparator } from '../components/templates/area-templates';
import { TopicTemplate, TopicsPageHeader, StickyHeader, ActiveTopicsTemplate } from '../components/templates/topic-templates';
import { TopicMessage, SafeHtml } from '../components/templates/topicmessage-templates';
import { PmRowTemplate, PmPageHeader } from '../components/templates/pm-templates';

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
    PmPage,
    LoginPage,
    AreaPage,
    TopicPage,
    UserInfoPage,
    TopicsPageHeader,
    TopicTemplate,
    TopicMessage,
    StickyHeader,
    ActiveTopicsTemplate,
    PmRowTemplate,
    PmPageHeader,
    PmReadPage,
    SafeHtml
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    TopicPage,
    UserInfoPage,
    PmPage,
    PmReadPage
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
