import { Component } from '@angular/core';
import { NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PatiService } from '../../providers/pati.service';
import cheerio from 'cheerio';

@Component({
  selector: 'page-pmread',
  templateUrl: 'pmread.html'
})
export class PmReadPage {

  incomingPm: any;
  pm: any;

  constructor(private navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public service: PatiService) {

    this.incomingPm = navParams.get("pm");

    this.getPm();
  }

  private getPm() {

    let loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "Yükleniyor..."
    });
    loader.present();

    this.service.getPmContent(this.incomingPm.id).then(
      (data) => {
        if (data) {
          this.pm = data;
          this.filterPmContent();
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

  private filterPmContent() {
    this.pm.filter(x => x.date && x.time);

    this.pm.filter(msg => {
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
    this.pm = this.pm[0];
  }
}
