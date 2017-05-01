import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { PatiService } from '../../providers/pati.service';
import cheerio from 'cheerio';

@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html'
})
export class TopicPage {

  topic: any;
  messages: any;
  toLastPage: boolean = false;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public loadingCtrl: LoadingController,
              public service: PatiService) {

    this.topic = navParams.get("topic");
    this.toLastPage = navParams.get("toLasPage");


    this.getTopic();
  }

  private getTopic(refresher = null) {
    if (refresher)
      refresher.complete();

    let loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Yükleniyor..."
    });
    loader.present();

    this.service.getTopicContent(this.topic.topicID).then(
      (data) => {
        this.messages = data;
        if (this.messages) {
          this.filterMessages();
        }
        console.log(this.messages);
        loader.dismissAll();
      },
      (err) => {
        console.log(err);
        loader.dismissAll();
      });
  }

  private filterMessages() {
    this.messages = this.messages.filter(x => x.date && x.time);

    this.messages.filter(msg => {
      let ch = cheerio.load(msg.content);
      ch('script').remove();
      ch('.bbcode_spoiler_close').remove();

      ch('.bbcode_spoiler').each((i, elem) => {

        let spoiler = '<div class="spoiler"><label class="spoiler-link" for=spo_'+i+'>' +
          ch(elem).children('.bbcode_spoiler_link_view').text() + '</label><input id="spo_'+i+'" type="checkbox"> ' +
          '<div class="spoiler-inner">' + ch(elem).children('.bbcode_spoiler_inner').html() +
          '</div></div>';

        ch(elem).replaceWith(spoiler);
        // ch(elem).removeAttr('onclick');
        // ch(elem).removeAttr('href');
        // let test = ch(elem).text();
        // console.log(test);
        msg.content = ch.html();
      });

      msg.content = ch.html();

      // Smiley filtering
      // ch('.mod_smileys_img').each((i, elem) => {
      //   msg.content = ch.html();
      // });
      // <ion-icon name="eye"></ion-icon>

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

    });
  }

  filterImages() {

  }

}
