import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-createpassage',
  templateUrl: 'createpassage.html',
})
export class CreatepassagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {

  }


  dismiss(){
    this.viewCtrl.dismiss();
  }
}
