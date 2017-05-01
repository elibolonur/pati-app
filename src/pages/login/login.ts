import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Authentication } from '../../providers/auth.service';
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  password: string = '';
  username: string = '';


  constructor(public navCtrl: NavController,
              public auth: Authentication,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  doLogin() {
    if (this.username === '' || this.password === '') {
      let alert = this.alertCtrl.create({
        title: 'Hata!',
        subTitle: 'Formu doldurmadiniz!',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    let loader = this.loadingCtrl.create({
      content: "Giris yapiliyor..."
    });
    loader.present();

    this.auth.login(this.username, this.password).then(
      (data) => {
        loader.dismissAll();
        this.navCtrl.setRoot(TabsPage);
      },
      (err) => {
        loader.dismissAll();
        let alert = this.alertCtrl.create({
          title: 'Hata!',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      });
  }

}
