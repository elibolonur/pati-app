import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { PatiService } from '../../providers/pati.service';

@Component({
  selector: 'page-favorite-topics',
  templateUrl: 'favorite-topics.html'
})
export class FavoriteTopicsPage {

  followedTopics: any;

  constructor(private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public service: PatiService) {

    this.getFollowedTopics();
  }

  // Get areas
  private getFollowedTopics(refresher = null) {
    if (refresher) {
      refresher.complete();
      this.followedTopics = [];
    }

    let loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Yükleniyor..."
    });
    loader.present();


    this.service.getFollowedTopicsPage().then(
      (data) => {
        if (data) {
          this.followedTopics = data;
          if (this.followedTopics) {
            this.filterTopics();
          }
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

  private filterTopics() {
    this.followedTopics = this.followedTopics.filter(x => x.title !== "")
  }

}
