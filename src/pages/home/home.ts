import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { PatiService } from '../../providers/pati.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  areas: any;
  favorites: any;
  paticikcom: any;
  patitech: any;
  patizone: any;
  ilgialanlari: any;
  yasam: any;
  patido: any;
  spor: any;
  oyunlar: any;
  mmporg: any;
  oyunsunuculari: any;
  diger: any;
  moderasyon: any;

  constructor(public service: PatiService,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {

    this.getMainPage();
  }

  private getMainPage(refresher = null) {
    if (refresher)
      refresher.complete();

    let loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Yükleniyor..."
    });
    loader.present();
    this.service.getMainPage().then(
      (data) => {
        this.areas = data;
        if (this.areas)
          this.filterAreas();
        // console.log(this.favorites);
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

  private filterAreas() {
    this.favorites = this.areas.filter(x => x.areaParent === "favorites");
    this.paticikcom = this.areas.filter(x => x.areaParent === "paticikcom");
    this.patitech = this.areas.filter(x => x.areaParent === "patitech");
    this.patizone = this.areas.filter(x => x.areaParent === "patizone");
    this.ilgialanlari = this.areas.filter(x => x.areaParent === "ilgialanlari");
    this.yasam = this.areas.filter(x => x.areaParent === "yasam");
    this.patido = this.areas.filter(x => x.areaParent === "patido");
    this.spor = this.areas.filter(x => x.areaParent === "spor");
    this.oyunlar = this.areas.filter(x => x.areaParent === "oyunlar");
    this.mmporg = this.areas.filter(x => x.areaParent === "mmporg");
    this.oyunsunuculari = this.areas.filter(x => x.areaParent === "oyunsunuculari");
    this.diger = this.areas.filter(x => x.areaParent === "diger");
    this.moderasyon = this.areas.filter(x => x.areaParent === "moderasyon");
  }
}
