import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl:ModalController) {
  }


  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    //关闭后的回调
    // modal.onDidDismiss(() => {
    //   this.loadUserPage();
    // });
    modal.present();
  }

}
