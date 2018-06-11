import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
