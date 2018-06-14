import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import {
  Storage
} from '@ionic/storage';
import {
  BaseUI
} from '../../common/baseui';
import {
  RestProvider
} from '../../providers/rest/rest';

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage extends BaseUI {

  id: string;
  content: string;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController) {
    super();
    this.id = navParams.get('id');
    //console.log(this.id);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    if (this.content == null) {
      super.showToast(this.toastCtrl, "评论内容不能为空...");
      return;
    }
    this.storage.get("token").then((val) => {
        if (val !== null) {
          var loading = super.showLoading(this.loadingCtrl, "发表中...");
          this.rest.createComment(val, this.id, this.content).subscribe(f => {
              if (f["status_code"] == 666) {
                loading.dismiss();
                this.dismiss();
                super.showToast(this.toastCtrl, "评论成功");
              } else {
                loading.dismiss();
                super.showToast(this.toastCtrl, f["StatusContent"]);
              }
            },
            error => {
              this.errorMessage = < any > error;
              if (error.substring(0, 3) == "401") {
                //console.log(1);
                this.storage.remove('token');
                loading.dismiss();
                super.showToast(this.toastCtrl, "您的登陆信息已过期，请重新登陆。");
              }
            });
          }
          else {
            super.showToast(this.toastCtrl, "请登陆后发布回答...");
          }
        });
    }

  }
