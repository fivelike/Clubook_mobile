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
import {
  Storage
} from '@ionic/storage';

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
    public loadingCtrl: LoadingController,
    public storage: Storage) {
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

  gotoDetails(id) {
    this.navCtrl.push(DetailsPage, { id: id });
  }
  showCommentPage(id) {
    this.storage.get('token').then((val) => {
      if (val != null) {
        let modal = this.modalCtrl.create(CommentPage, { id: id });
        modal.present();
      } else {
        super.showToast(this.toastCtrl, "请登陆后评论...");
      }
    });
  }

  join() {
    this.storage.get('token').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl, "加入中...");
        this.rest.joinClub(val, this.circleId).subscribe(
          f => {
            if (f["status_code"] == 666) {
              loading.dismiss();
              super.showToast(this.toastCtrl, "加入成功！");
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f["message"]);
            }
          },
          err => {
            this.errorMessage = <any>err;
            if (err.substring(0, 3) == "401") {
              this.storage.remove('token');
              loading.dismiss();
              super.showToast(this.toastCtrl, "您的登陆信息已过期，请重新登陆。");
            }
          }
        );
      } else {
        super.showToast(this.toastCtrl, "请登陆后加入...");
      }
    });
  }

  like(id, p) {
    this.storage.get('token').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl, "点赞中...");
        this.rest.like(val, id).subscribe(
          f => {
            if (f["status_code"] == 666) {
              loading.dismiss();
              super.showToast(this.toastCtrl, "点赞成功！");
              //console.log(this.passages.indexOf(p));
              this.passages[this.passages.indexOf(p)].likes++;
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f["message"]);
            }
          },
          error => this.errorMessage = <any>error
        );
      } else {
        super.showToast(this.toastCtrl, "请登陆后点赞...")
      }
    });
  }

}
