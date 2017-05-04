import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TopicPage } from "../../pages/topic-page/topic";


@Component({
  selector: '[pm-row]',
  host: {'class': 'pm-row'},
  template: `
    <ion-row align-items-stretch>
      <ion-col col-9 (click)="goToPm()" class="flex-vertical-center" [ngClass]="{'new-pm': message.isNew}">{{message.title}}</ion-col>

      <ion-col col-3>
        <ion-row align-items-center justify-content-center>
          <ion-col col-12 no-padding>
            {{message.info.date}}
          </ion-col>
          <ion-col col-12 no-padding>
            {{message.info.time}}
          </ion-col>
          <ion-col col-12 no-padding align-self-end>
            {{message.info.sender.name}}
          </ion-col>
        </ion-row>
      </ion-col>

    </ion-row>`
})
export class PmRowTemplate {

  @Input() message: any;

  constructor(public navCtrl: NavController) {
  }

  goToPm() {
    this.navCtrl.push(TopicPage, {
      message: this.message,
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
