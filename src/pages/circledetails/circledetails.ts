import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import { DetailsPage } from '../details/details';
@Component({
  selector: 'page-circledetails',
  templateUrl: 'circledetails.html',
})
export class CircledetailsPage {
  public passages: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController) {
    this.passages = [
      { "name": "社团1" },
      { "name": "社团2" },
      { "name": "社团3" },
      { "name": "社团4" },
      { "name": "社团5" },
      { "name": "社团6" },
      { "name": "社团7" },
      { "name": "社团8" }
    ];
  }
  gotoDetails() {
    //this.navCtrl.push(DetailsPage, { id: questionId });
    this.navCtrl.push(DetailsPage);
  }
  showCommentPage() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.present();
  }

}
