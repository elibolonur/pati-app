import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class Authentication {

  apiKey: string = "16a7cf79db61b9cab7c2563ef949947b818064083ecef72e5899f887814d2bc9";
  storage: any;
  authCookie: any;
  url: string = 'https://pati-scraper.herokuapp.com/';
  // url: string = 'http://localhost:3000/';

  constructor(public http: Http, storage: Storage) {
    this.storage = storage;
  }

  public login(username, password) {
    if (!username || !password) {
      return Promise.resolve(false);
    }
    else {
      return new Promise((resolve, reject) => {
        this.http.post(this.url + 'login', {
          uname: username,
          pass: password,
          apiKey: this.apiKey
        }).map(res => res.json())
          .subscribe(
            res => {
              if (res.success) {
                // Save user login cookie
                this.storage.ready().then(() => {
                  this.storage.set('authCookie', res.data);
                  this.storage.set('username', username);
                });
                resolve(res.data);
              }
              else {
                reject(res.msg);
              }
            },
            err => console.log(err)
          );
      });
    }
  }

  public logout() {
    // delete keypair
  }

}
