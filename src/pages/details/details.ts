import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CommentPage } from '../comment/comment';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController) {
      
  }

  showCommentPage() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.present();
  }

}
