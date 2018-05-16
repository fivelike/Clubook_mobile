import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-createclub',
  templateUrl: 'createclub.html',
})
export class CreateclubPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
