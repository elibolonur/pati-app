import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { PatiService } from '../../providers/pati.service';

@Component({
  selector: 'page-active-topics',
  templateUrl: 'active-topics.html'
})
export class ActiveTopicsPage {

  activeTopics: any;

  constructor(private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public service: PatiService) {

    this.getActiveTopics();
  }

  // Get areas
  private getActiveTopics(refresher = null) {
    if (refresher) {
      refresher.complete();
      this.activeTopics = [];
    }

    let loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Yükleniyor..."
    });
    loader.present();


    this.service.getActiveTopicsPage().then(
      (data) => {
        if (data) {
          this.activeTopics = data;
          if (this.activeTopics) {
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
    this.activeTopics = this.activeTopics.filter(x => x.title !== "")
  }

}
