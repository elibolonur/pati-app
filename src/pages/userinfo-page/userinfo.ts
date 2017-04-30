import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html'
})
export class UserInfoPage {

  user: any;

  constructor(public navCtrl: NavController,
              private navParams: NavParams) {

    this.user = navParams.get("user");

  }

}
