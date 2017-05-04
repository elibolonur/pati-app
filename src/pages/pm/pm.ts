import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { PatiService } from '../../providers/pati.service';

@Component({
  selector: 'page-pm',
  templateUrl: 'pm.html'
})
export class PmPage {

  privateMessages: any;

  constructor(public service: PatiService,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {

    this.getPM();
  }

  private getPM(refresher = null) {
    if (refresher)
      refresher.complete();

    let loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Yükleniyor..."
    });
    loader.present();
    this.service.getPrivateMessages().then(
      (data) => {
        this.privateMessages = data;
        if (this.privateMessages)
          this.filterPms();
        loader.dismissAll();
        console.log(this.privateMessages)
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

  private filterPms() {
    this.privateMessages = this.privateMessages.filter(x => x.title !== "")
  }
}
