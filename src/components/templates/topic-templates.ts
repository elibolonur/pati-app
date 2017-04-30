import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserInfoPage } from "../../pages/userinfo-page/userinfo";


@Component({
  selector: '[area-topic-row]',
  host: {'class': 'topic'},
  template: `
    <ion-row align-items-stretch>

      <ion-col col-1 class="flex-vertical-center">
        <img *ngIf="topic.topicType" class="flex-vertical-center" src="../../assets/img/{{topic.topicType}}.gif"/></ion-col>
      
      <ion-col col-8 class="title">
        <ion-grid class="title">
          <ion-row>{{topic.title}}</ion-row>
          <ion-row class="topic-info">
            <ion-col col-7 no-padding>
              {{topic.createdBy.name}}
            </ion-col>
            <ion-col col-5 text-right no-padding>
              <span style="color: black">{{topic.msgCount}}</span>
              <ion-icon name="chatboxes" align-self-end></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-col>

      <ion-col col-3>
        <ion-row align-items-center justify-content-center>
          <ion-col col-12 no-padding>
            {{topic.lastMsg.date}}
          </ion-col>
          <ion-col col-12 no-padding>
            {{topic.lastMsg.time}}
          </ion-col>
          <ion-col col-12 no-padding align-self-end>
            {{topic.lastMsg.user.name}}
          </ion-col>
        </ion-row>
      </ion-col>
      
    </ion-row>`
})
export class TopicTemplate {

  @Input() topic: any;

  constructor(public navCtrl: NavController) {
  }

  goToTopic() {
    this.navCtrl.push(UserInfoPage, {
      topic: this.topic
    });
  }

  goToUser() {
    this.navCtrl.push(UserInfoPage, {
      user: this.topic.lastMsg.user
    });
  }
}

@Component({
  selector: '[sticky-header]',
  host: {'class': 'sticky-header'},
  template: `
    <ion-row align-items-stretch>
      <ion-col col-12>Stickies</ion-col>
    </ion-row>`
})
export class StickyHeader {}

@Component({
  selector: '[topics-header]',
  host: {'class': 'topics-header'},
  template: `
    <ion-row align-items-stretch>
      <ion-col col-1></ion-col>
      <ion-col col-8>Konular</ion-col>
      <ion-col col-3 text-center>Son Mesaj</ion-col>
    </ion-row>`
})
export class TopicsHeader {}
