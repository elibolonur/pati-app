import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TopicPage } from "../../pages/topic-page/topic";


// TO DO
// Go to lastpage
// Topic options

@Component({
  selector: '[area-topic-row]',
  host: {'class': 'topic'},
  template: `
    <ion-row align-items-stretch>
      <ion-grid class="topics-page-header" *ngIf="topic.pageHeader">
        <ion-row align-items-stretch>
          <ion-col col-12 text-center>Sayfa: [{{topic.pageHeader}}]</ion-col>
        </ion-row>
      </ion-grid>

      <ion-col col-1 class="flex-vertical-center" *ngIf="!topic.pageHeader">
        <img *ngIf="topic.topicType" class="flex-vertical-center" src="../../assets/img/{{topic.topicType}}.gif"/>
      </ion-col>

      <ion-col col-8 (click)="goToTopic()" *ngIf="!topic.pageHeader">
        <ion-grid class="title">
          <ion-row>{{topic.title}}</ion-row>
          <ion-row class="topic-info">
            <ion-col col-7 no-padding>
              {{topic.createdBy.name}}
            </ion-col>
            <ion-col col-5 text-right no-padding>
              <span>{{topic.msgCount}}</span>
              <ion-icon name="chatboxes" align-self-end></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-col>

      <ion-col col-3 *ngIf="!topic.pageHeader">
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
    this.navCtrl.push(TopicPage, {
      topic: this.topic,
      toLastPage: false
    });
  }

  goToLastPage() {
    this.navCtrl.push(TopicPage, {
      user: this.topic.lastMsg.user,
      toLastPage: true
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
export class StickyHeader {
}

@Component({
  selector: '[topics-page-header]',
  host: {'class': 'topics-page-header'},
  template: `
    <ion-row align-items-stretch>
      <ion-col col-12 text-center>Sayfa: [1]</ion-col>
    </ion-row>`
})
export class TopicsPageHeader {
}

// Topic template for ActiveTopics page
@Component({
  selector: '[active-topic-row]',
  host: {'class': 'topic'},
  template: `
    <ion-row align-items-stretch>

      <ion-col col-1 class="flex-vertical-center">
        <img *ngIf="topic.topicType" class="flex-vertical-center" src="../../assets/img/{{topic.topicType}}.gif"/>
      </ion-col>

      <ion-col col-8 (click)="goToTopic()" class="in-active-topics">
        <ion-grid class="title">
          <ion-row>{{topic.title}}</ion-row>
          <ion-row><ion-icon name="git-branch" style="margin-right: 3px;"></ion-icon> {{topic.area.name}}</ion-row>
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
export class ActiveTopicsTemplate {

  @Input() topic: any;

  constructor(public navCtrl: NavController) {
  }

  goToTopic() {
    this.navCtrl.push(TopicPage, {
      topic: this.topic,
      toLastPage: false
    });
  }

  goToLastPage() {
    this.navCtrl.push(TopicPage, {
      user: this.topic.lastMsg.user,
      toLastPage: true
    });
  }
}
