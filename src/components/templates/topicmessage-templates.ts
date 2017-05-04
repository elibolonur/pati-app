import { Component, Input, Pipe } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: '[topic-message-row]',
  host: {'class': 'topic-message'},
  template: `
    <ion-row align-items-stretch class="message-page-header" *ngIf="message.pageHeader">
      <ion-col col-12 text-center>Sayfa: [{{message.pageHeader}}]</ion-col>
    </ion-row>
    
    <ion-list *ngIf="!message.pageHeader">
      <ion-item-sliding #item>
        <ion-item>

          <!--Message header-->
          <ion-row align-items-stretch>
            <ion-col col-6>{{message.postedBy.name}}</ion-col>
            <ion-col col-6>§ {{message.date}}, {{message.time}}</ion-col>
          </ion-row>

          <!--Member info-->
          <ion-row align-items-stretch>
            <ion-col col-3>
              <ion-row [ngClass]="{'special-user-title': message.postedBy.title.isSpecial}">
                {{message.postedBy.title.name}}
              </ion-row>
              <ion-row>
                <img src="../../assets/img/medal_1k.gif" *ngIf="message.postedBy.medals.length > 0">
                <img src="../../assets/img/medal_5k.gif" *ngIf="message.postedBy.medals.length > 1">
                <img src="../../assets/img/medal_10k.gif" *ngIf="message.postedBy.medals.length > 2">
              </ion-row>

              <ion-row *ngIf="message.isNew">yeni</ion-row>
            </ion-col>

            <!--Message content-->
            <ion-col col-9 [innerHTML]="message.content | safeHtml">
            </ion-col>
          </ion-row>

        </ion-item>

        <!--Slide content-->
        <!--<ion-item-options side="right">-->
        <!--<button ion-button color="danger">-->
        <!--<ion-icon name="chatboxes"></ion-icon>-->
        <!--Özel Mesaj-->
        <!--</button>-->
        <!--<button ion-button>-->
        <!--<ion-icon name="archive" color="warning"></ion-icon>-->
        <!--Alinti-->
        <!--</button>-->
        <!--</ion-item-options>-->
      </ion-item-sliding>
    </ion-list>`
})
export class TopicMessage {

  @Input() message: any;

  constructor(public navCtrl: NavController) {
  }
}

@Pipe({name: 'safeHtml'})
export class SafeHtml {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
