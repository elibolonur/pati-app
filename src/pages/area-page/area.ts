import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PatiService } from '../../providers/pati.service';


@Component({
  selector: 'page-area',
  templateUrl: 'area.html'
})
export class AreaPage {

  area: any;
  topics: any;
  stickies: any;
  lastPageLoaded: number = 1;
  infiniteHasEnded: boolean = true;
  maxPages: number;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public service: PatiService) {

    this.area = navParams.get("area");
    this.getArea();
  }

  // Get areas
  private getArea(refresher = null) {
    if (refresher) {
      refresher.complete();
      this.topics = null;
      this.lastPageLoaded = 1;
    }

    let loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Yükleniyor..."
    });
    loader.present();

    this.service.getAreaContent(this.area.areaID).then(
      (data) => {
        this.topics = data["topics"];
        if (this.topics) {
          this.maxPages = data["maxPage"];
          this.prepareTopics();
        }
        loader.dismissAll();
      },
      (err) => {
        console.log(err);
        loader.dismissAll();
        let alert = this.alertCtrl.create({
          title: 'Hata!',
          subTitle: 'Sunucuya baglanirken bi hata olustu! <br><br> Hata: ' + err,
          buttons: ['OK']
        });
        alert.present();
      });
  }

  // Infinite Scroll
  doInfinite(infiniteScroll) {

    if (this.maxPages > this.lastPageLoaded) {
      this.lastPageLoaded++;

      this.service.getAreaContent(this.area.areaID + ",page=" + this.lastPageLoaded).then(
        (data) => {
          let newTopics = data["topics"];
          if (newTopics) {
            this.addNewTopics(newTopics);
            setTimeout(() => {
              infiniteScroll.complete();
            }, 500);
          }
        },
        (err) => {
          console.log(err);
          infiniteScroll.complete();
          let alert = this.alertCtrl.create({
            title: 'Hata!',
            subTitle: 'Sunucuya baglanirken bi hata olustu! <br><br> Hata: ' + err,
            buttons: ['OK']
          });
          alert.present();
        });
    }

    if (this.maxPages == this.lastPageLoaded) {
      this.infiniteHasEnded = true;
    }
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

  private prepareTopics() {
    this.stickies = this.topics.filter(x => x.topicType && x.topicType.includes("sticky"));
    this.topics = this.filterTopics(this.topics);

    if (this.maxPages !== 1) {
      this.infiniteHasEnded = false;
    }
  }

  private addNewTopics(topics) {
    let newTopics = this.filterTopics(topics);
    newTopics.forEach((item) => {
      this.topics.push(item);
    });
  }

  private filterTopics(topics) {
    return topics.filter(
      (x => x.title !== "" && !x.topicType ||
      (x.topicType && (x.topicType.includes("message_new") || x.topicType.includes("message_locked")))));
  }
}
