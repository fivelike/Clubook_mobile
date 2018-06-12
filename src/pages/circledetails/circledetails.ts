import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ModalController,
  ToastController,
  LoadingController
} from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import { DetailsPage } from '../details/details'
import {
  BaseUI
} from '../../common/baseui';
import {
  RestProvider
} from '../../providers/rest/rest';
@Component({
  selector: 'page-circledetails',
  templateUrl: 'circledetails.html',
})
export class CircledetailsPage extends BaseUI{
  public passages: any;

  public circleId:string;
  public circle:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    super();
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

  ionViewDidLoad() {
    this.circleId = this.navParams.get('id');
    this.loadCircleDate(this.circleId);

  }

  loadCircleDate(id){
    this.rest.getClubById(id)
      .subscribe(
        f => {
          if (f["status_code"] == 666) {
            console.log(f);
            this.circle = f["circle"];
          } else {
            super.showToast(this.toastCtrl, f["message"]);
          }
        }
      );
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
