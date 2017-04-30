import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { PatiService } from '../../providers/pati.service';


@Component({
  selector: 'page-area',
  templateUrl: 'area.html'
})
export class AreaPage {

  area: any;
  topics: any;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public loadingCtrl: LoadingController,
              public service: PatiService) {

    this.area = navParams.get("area");
    this.getArea();
  }

  private getArea(refresher = null) {
    if (refresher)
      refresher.complete();

    let loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Yükleniyor..."
    });
    loader.present();

    this.service.getAreaContent(this.area.areaID).then(
      (data) => {
        this.topics = data;
        if (this.topics) {
          this.filterTopics();
        }
        console.log(this.topics);
        loader.dismissAll();
      },
      (err) => {
        console.log(err);
        loader.dismissAll();
      });
  }

  private filterTopics() {
    this.topics = this.topics.filter(x => x.title !== "");
  }
}
