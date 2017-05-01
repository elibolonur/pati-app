import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Authentication } from './auth.service'
import { Storage } from '@ionic/storage';

@Injectable()
export class PatiService {

  storage: any;
  apiKey: string;

  constructor(public http: Http, auth: Authentication, storage: Storage) {
    this.storage = storage;
    this.apiKey = auth.apiKey;
  }

  public getMainPage() {
    return new Promise((resolve, reject) => {
      this.storage.get('authCookie').then((cookie) => {
        this.http.post('http://localhost:3000/getMainPage', {
          apiKey: this.apiKey,
          authCookie: cookie
        }).map(res => res.json())
          .subscribe(
            res => {
              if (res.success) {
                // if not logged in send to login
                resolve(res.data);
              }
              else {
                console.log(res)
                reject(res.msg);
              }
            },
            err => console.log(err)
          );

      });
    });
  }

  public getAreaContent(areaID) {
    return new Promise((resolve, reject) => {
      this.storage.get('authCookie').then((cookie) => {
        this.http.post('http://localhost:3000/getArea', {
          apiKey: this.apiKey,
          authCookie: cookie,
          areaID: areaID
        }).map(res => res.json())
          .subscribe(
            res => {
              if (res.success) {
                // if not logged in send to login
                resolve(res.data);
              }
              else {
                console.log(res);
                reject(res.msg);
              }
            },
            err => console.log(err)
          );
      });
    });
  }

  public getTopicContent(topicID) {
    return new Promise((resolve, reject) => {
      this.storage.get('authCookie').then((cookie) => {
        this.http.post('http://localhost:3000/getTopic', {
          apiKey: this.apiKey,
          authCookie: cookie,
          topicID: topicID
        }).map(res => res.json())
          .subscribe(
            res => {
              if (res.success) {
                // if not logged in send to login
                resolve(res.data);
              }
              else {
                console.log(res);
                reject(res.msg);
              }
            },
            err => console.log(err)
          );
      });
    });
  }
}
