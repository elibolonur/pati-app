import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PmReadPage } from "../../pages/pm-read/pmread";

// Template for to show Private messages - list item

@Component({
  selector: '[pm-row]',
  host: {'class': 'pm-row'},
  template: `
    <ion-row align-items-stretch>
      <ion-col col-9 (click)="goToPm()" class="flex-vertical-center" [ngClass]="{'new-pm': pm.isNew}">{{pm.title}}
      </ion-col>

      <ion-col col-3 tappable>
        <ion-row align-items-center justify-content-center>
          <ion-col col-12 no-padding>
            {{pm.info.date}}
          </ion-col>
          <ion-col col-12 no-padding>
            {{pm.info.time}}
          </ion-col>
          <ion-col col-12 no-padding align-self-end>
            {{pm.info.sender.name}}
          </ion-col>
        </ion-row>
      </ion-col>

    </ion-row>`
})
export class PmRowTemplate {

  @Input() pm: any;

  constructor(public navCtrl: NavController) {
  }

  goToPm() {
    this.navCtrl.push(PmReadPage, {
      pm: this.pm,
    });
  }
}

@Component({
  selector: '[pm-page-header]',
  host: {'class': 'pm-page-header'},
  template: `
    <ion-row align-items-stretch>
      <ion-col col-9>{{staticFirst}}</ion-col>
      <ion-col col-3 text-center>{{staticSecond}}</ion-col>
    </ion-row>`
})
export class PmPageHeader {
  @Input() staticFirst: string;
  @Input() staticSecond: string;
}


@Component({
  selector: '[pm-body]',
  host: {'class': 'pm-container'},
  template: `
    <!--Message header-->
    <ion-row align-items-stretch>
    </ion-row>`
})
export class PmBodyTemplate {

  @Input() message: any;

  constructor(public navCtrl: NavController) {
  }
}
