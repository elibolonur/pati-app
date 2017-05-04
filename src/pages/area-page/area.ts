import { Component } from '@angular/core';
import { NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PatiService } from '../../providers/pati.service';


@Component({
  selector: 'page-area',
  templateUrl: 'area.html'
})
export class AreaPage {

  area: any;
  topics: any = [];
  stickies: any = [];
  currentPage: number = 1;
  infiniteHasEnded: boolean = false;
  maxPages: number;

  constructor(private navParams: NavParams,
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
      this.topics = [];
      this.currentPage = 1;
    }

    let loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Yükleniyor..."
    });
    loader.present();


    this.service.getAreaContent(this.area.areaID + ",page=" + this.currentPage).then(
      (data) => {
        if (data["topics"]) {
          this.setMaxPages(data["maxPages"]);
          this.stickies = this.getStickies(data["topics"]);
          this.getTopics(data["topics"]);
        }
        loader.dismissAll();
      },
      (err) => {
        console.log(err);
        loader.dismissAll();
        let alert = this.alertCtrl.create({
          title: 'Hata!',
          subTitle: 'Sunucuya baglanirken hata olustu! <br><br> Hata: ' + err,
          buttons: ['OK']
        });
        alert.present();
      });
  }

  // Infinite Scroll
  doInfinite(infiniteScroll) {
    if (this.maxPages > this.currentPage) {
      this.currentPage++;

      this.getArea();

      setTimeout(() => {
        infiniteScroll.complete();
      }, 500);
    }

    if (this.maxPages == this.currentPage) {
      this.infiniteHasEnded = true;
    }
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

  private getTopics(topics) {
    let newTopics = this.filterTopics(topics);

    this.topics.push({pageHeader: this.currentPage});
    newTopics.forEach((topic) => {
      this.topics.push(topic);
    });
  }

  private getStickies(topics) {
    return topics.filter(x => x.topicType && x.topicType.includes("sticky"));
  }

  private setMaxPages(maxPages) {
    this.maxPages = maxPages;
    this.maxPages === 1 ? this.infiniteHasEnded = true : this.infiniteHasEnded = false;
  }

  private filterTopics(topics) {
    return topics.filter(
      (x => x.title !== "" && !x.topicType ||
      (x.topicType && (x.topicType.includes("message_new") || x.topicType.includes("message_locked")))));
  }
}
