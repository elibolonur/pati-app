import { Component, forwardRef, Inject } from '@angular/core';
import { Http } from '@angular/http';
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
  page: string = 'app';
  apiEvents: any;


  constructor(public navCtrl: NavController,
              @Inject(forwardRef(() => Authentication)) public auth: Authentication,
              public http: Http,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

    this.getEventsFromGroupProject();


  }

  getEventsFromGroupProject() {
    this.http.get("http://decoreapp.azurewebsites.net/api/events").map(res => res.json())
      .subscribe(
        res => {
          this.apiEvents = res;
        }
      );
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
        if (data) {
          loader.dismissAll();
          this.navCtrl.setRoot(TabsPage);
        }
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
