import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Authentication } from './auth.service'
import { Storage } from '@ionic/storage';

@Injectable()
export class PatiService {

  storage: any;
  apiKey: string;
  url: string = "http://localhost:3000/";


  constructor(public http: Http, auth: Authentication, storage: Storage) {
    this.storage = storage;
    this.apiKey = auth.apiKey;
  }

  // Request to get MainPage content (area categories)
  public getMainPage() {
    return new Promise((resolve, reject) => {
      this.storage.get('authCookie').then((cookie) => {
        this.http.post(this.url + 'getMainPage', {
          apiKey: this.apiKey,
          authCookie: cookie
        }).map(res => res.json())
          .subscribe(
            res => {
              if (res.success) {
                resolve(res.data);
              }
              else {
                console.log(res);
                reject(res.msg);
              }
            },
            err => reject(err)
          );

      });
    });
  }

  // Request to get Active Topics content (topics)
  public getActiveTopicsPage() {
    return new Promise((resolve, reject) => {
      this.storage.get('authCookie').then((cookie) => {
        this.http.post(this.url + 'getActiveTopics', {
          apiKey: this.apiKey,
          authCookie: cookie
        }).map(res => res.json())
          .subscribe(
            res => {
              if (res.success) {
                resolve(res.data);
              }
              else {
                console.log(res);
                reject(res.msg);
              }
            },
            err => reject(err)
          );

      });
    });
  }

  // Request to get Followed topics content (topics)
  public getFollowedTopicsPage() {
    return new Promise((resolve, reject) => {
      this.storage.get('authCookie').then((cookie) => {
        this.http.post(this.url + 'getFollowedTopics', {
          apiKey: this.apiKey,
          authCookie: cookie
        }).map(res => res.json())
          .subscribe(
            res => {
              if (res.success) {
                resolve(res.data);
              }
              else {
                console.log(res);
                reject(res.msg);
              }
            },
            err => reject(err)
          );

      });
    });
  }

  // Request to get PM page (Private messages)
  public getPrivateMessages() {
    return new Promise((resolve, reject) => {
      this.storage.get('authCookie').then((cookie) => {
        this.http.post(this.url + 'getMsgPage', {
          apiKey: this.apiKey,
          authCookie: cookie
        }).map(res => res.json())
          .subscribe(
            res => {
              if (res.success) {
                resolve(res.data);
              }
              else {
                console.log(res);
                reject(res.msg);
              }
            },
            err => reject(err)
          );

      });
    });
  }

  // Request to get Private Message content (PM Body)
  public getPmContent(pmID) {
    return new Promise((resolve, reject) => {
      this.storage.get('authCookie').then((cookie) => {
        this.http.post(this.url + 'getMessage', {
          apiKey: this.apiKey,
          authCookie: cookie,
          pmID: pmID
        }).map(res => res.json())
          .subscribe(
            res => {
              if (res.success) {
                resolve(res.data);
              }
              else {
                console.log(res);
                reject(res.msg);
              }
            },
            err => reject(err)
          );

      });
    });
  }

  // Request to get Area content (topics in an area)
  public getAreaContent(areaID) {
    return new Promise((resolve, reject) => {
      this.storage.get('authCookie').then((cookie) => {
        this.http.post(this.url + 'getArea', {
          apiKey: this.apiKey,
          authCookie: cookie,
          areaID: areaID
        }).map(res => res.json())
          .subscribe(
            res => {
              if (res.success) {
                resolve(res.data);
              }
              else {
                console.log(res);
                reject(res.msg);
              }
            },
            err => reject(err)
          );
      });
    });
  }

  // Request to get Topic content - (topic messages)
  public getTopicContent(topicID) {
    return new Promise((resolve, reject) => {
      this.storage.get('authCookie').then((cookie) => {
        this.http.post(this.url + 'getTopic', {
          apiKey: this.apiKey,
          authCookie: cookie,
          topicID: topicID
        }).map(res => res.json())
          .subscribe(
            res => {
              if (res.success) {
                resolve(res.data);
              }
              else {
                console.log(res);
                reject(res.msg);
              }
            },
            err => reject(err)
          );
      });
    });
  }
}
