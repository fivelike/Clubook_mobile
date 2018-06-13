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
  public errorMessage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    super();
  }

  ionViewDidLoad() {
    this.circleId = this.navParams.get('id');
    this.loadCircleDate();
    this.getPassageFeeds();
  }

  loadCircleDate(){
    this.rest.getCircleById(this.circleId)
      .subscribe(
        f => {
          if (f["status_code"] == 666) {
            this.circle = f["circle"];
            console.log(this.circle);
          } else {
            super.showToast(this.toastCtrl, f["message"]);
          }
        }
      );
  }

  getPassageFeeds() {
    let loading = super.showLoading(this.loadingCtrl, "数据加载中...");
    this.rest.getCirclePassages(this.circleId).subscribe(
      f => {
        console.log("获取文章");
        console.log(f);
        if (f["status_code"] == 666) {
          this.passages = f["articles"];
          loading.dismiss();
        } else {
          loading.dismiss();
          super.showToast(this.toastCtrl, f["message"]);
        }
      },
      error => this.errorMessage = <any>error
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
