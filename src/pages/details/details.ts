import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ModalController,
  ToastController,
  LoadingController
} from 'ionic-angular';
import { CommentPage } from '../comment/comment';

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
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI{

  id:string;
  passage:any;
  comments:any=[];
  likes:number=0;
  errorMessage:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: Storage) {
      super();
  }
  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.loadDate();
  }

  loadDate(){
    let loading = super.showLoading(this.loadingCtrl, "数据加载中...");
    this.rest.getArticleById(this.id).subscribe(
      f=>{
        console.log(f);
        if(f["status_code"]==666){
          this.passage = f["article"];
          this.comments = f["comments"];
          this.likes = f["article"].likes;
          loading.dismiss();
        } else {
          super.showToast(this.toastCtrl, f["message"]);
        }
      }
    );
  }

  showCommentPage() {
    this.storage.get('token').then((val) => {
      if (val != null) {
        let modal = this.modalCtrl.create(CommentPage, { "id": this.id });
        //关闭后的回调
        modal.onDidDismiss(() => {
          this.loadDate();
        });
        modal.present();
      } else {
        super.showToast(this.toastCtrl, "请登陆后评论...");
      }
    });
  }

  like(id) {
    this.storage.get('token').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl, "点赞中...");
        this.rest.like(val, id).subscribe(
          f => {
            if (f["status_code"] == 666) {
              loading.dismiss();
              super.showToast(this.toastCtrl, "点赞成功！");
              this.likes++;
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
