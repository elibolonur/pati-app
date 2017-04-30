import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AreaPage } from '../../pages/area-page/area';
import { UserInfoPage } from "../../pages/userinfo-page/userinfo";


@Component({
  selector: '[mainpage-area-row]',
  host: {'class': 'area'},
  template: `
    <ion-row align-items-stretch>
      <ion-col col-1><img src="../../assets/img/message_new.gif" *ngIf="area.hasNewMsg"/></ion-col>
      <ion-col col-7 (click)="goToArea()">
        <ion-grid class="title">
          <ion-row>{{area.title}}</ion-row>
          <ion-row class="text-wrapper text-small">{{area.description}}</ion-row>
        </ion-grid>
      </ion-col>
      <ion-col col-4 class="flex-vertical-center">
        <ion-row justify-content-center>{{area.lastMsg.date}}, {{area.lastMsg.time}}</ion-row>
        <ion-row justify-content-center (click)="goToUser()">{{area.lastMsg.user.name}}</ion-row>
      </ion-col>
    </ion-row>`
})
export class AreaTemplate {

  @Input() area: any;

  constructor(public navCtrl: NavController) {
  }

  goToArea() {
    this.navCtrl.push(AreaPage, {
      area: this.area
    });
  }

  goToUser() {
    this.navCtrl.push(UserInfoPage, {
      user: this.area.lastMsg.user
    });
  }
}

// Area Separator - MainPage
@Component({
  selector: '[area-separator]',
  host: {'class': 'area-separator'},
  template: `
    <ion-row align-items-stretch>
      <ion-col col-12>» {{name}}</ion-col>
    </ion-row>`
})
export class AreaSeparator {
  @Input() name: string;
}

// Areas Header - MainPage
@Component({
  selector: '[areas-header]',
  template: `
    <ion-row align-items-stretch>
      <ion-col col-1></ion-col>
      <ion-col col-7>Alan</ion-col>
      <ion-col col-4 text-center>Son Mesaj</ion-col>
    </ion-row>`
})
export class AreasHeader {}
