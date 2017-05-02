import { Component } from '@angular/core';
import { NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PatiService } from '../../providers/pati.service';
import cheerio from 'cheerio';

@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html'
})
export class TopicPage {

  topic: any;
  messages: any = [];
  toLastPage: boolean = false;
  currentPage: number = 1;
  infiniteHasEnded: boolean = false;
  maxPages: number;

  constructor(private navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public service: PatiService) {

    this.topic = navParams.get("topic");
    this.toLastPage = navParams.get("toLastPage");

    this.getTopicContent();
  }

  private getTopicContent(refresher = null) {
    if (refresher) {
      refresher.complete();
      this.messages = null;
      this.currentPage = 1;
    }

    let loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Yükleniyor..."
    });
    loader.present();

    this.service.getTopicContent(this.topic.topicID + ",page=" + this.currentPage).then(
      (data) => {
        if (data["messages"]) {
          this.setMaxPages(data["maxPages"]);
          this.getMessages(data["messages"]);
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

  // Infinite Scroll
  doInfinite(infiniteScroll) {
    if (this.maxPages > this.currentPage) {
      this.currentPage++;

      this.getTopicContent();

      setTimeout(() => {
        infiniteScroll.complete();
      }, 500);
    }

    if (this.maxPages == this.currentPage) {
      this.infiniteHasEnded = true;
    }
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }


  private getMessages(messages) {
    let newMessages = this.filterMessages(messages);

    this.messages.push({pageHeader: this.currentPage});
    newMessages.forEach((topic) => {
      this.messages.push(topic);
    });
  }

  private filterMessages(messages) {
    const filteredMessages = messages.filter(x => x.date && x.time);

    filteredMessages.filter(msg => {
      let ch = cheerio.load(msg.content);
      ch('script').remove();
      ch('.bbcode_spoiler_close').remove();

      msg.content = ch.html();

      ch('.bbcode_spoiler').each((i, elem) => {
        let spoiler = '<div class="spoiler"><label class="spoiler-link" for=spo_' + i + '>' +
          ch(elem).children('.bbcode_spoiler_link_view').text() + '</label><input id="spo_' + i + '" type="checkbox"> ' +
          '<div class="spoiler-inner">' + ch(elem).children('.bbcode_spoiler_inner').html() +
          '</div></div>';

        ch(elem).replaceWith(spoiler);
        msg.content = ch.html();
      });

      // Smiley filtering
      ch('.mod_smileys_img').each((i, elem) => {
        let imgSrc = elem.attribs.src.substring(elem.attribs.src.lastIndexOf('/') + 1);
        let newSmiley = '<img class="smiley" src="../../assets/smiley/' + imgSrc + '">';

        ch(elem).replaceWith(newSmiley);
        msg.content = ch.html();
      });

      // Image Filtering
      ch('.mod_embed_images_image a').each((i, elem) => {
        let newImg = ch('<img src="' + elem.attribs.href + '">');

        if (ch(elem).parents('.mod_embed_images_extended').html()) {
          ch(elem).parents('.mod_embed_images_extended').replaceWith(newImg);
        }
        else if (ch(elem).parents('.mod_embed_images').text()) {
          ch(elem).parents('.mod_embed_images').replaceWith(newImg);
        }
        msg.content = ch.html();
      });
      return msg;
    });

    return filteredMessages;
  }

  private setMaxPages(maxPages) {
    this.maxPages = maxPages;

    if (this.maxPages === undefined) {
      this.infiniteHasEnded = true;
      this.maxPages = 1;
    }
    else {
      this.infiniteHasEnded = false;
    }
  }
}
