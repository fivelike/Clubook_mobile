import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  ModalController,
  ToastController,
  ViewController
} from 'ionic-angular';
import {
  BaseUI
} from '../../common/baseui';
import {
  Storage
} from '@ionic/storage';
import {
  RestProvider
}
from '../../providers/rest/rest';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {

  headface: string = "http://img1.touxiang.cn/uploads/20121212/12-055808_368.jpg";
  errorMessage: any;
  nickname: string = "加载中...";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl: LoadingController,
    public modalCtrl: ModalController,
    public rest: RestProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {
    super();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('token').then((val) => {
      if (val != null) {
        //加载用户数据
        let loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserInfo(val)
          .subscribe(userinfo => {
              this.nickname = userinfo["nickname"];
              this.headface = userinfo["IconUrl"] + "?" + (new Date()).valueOf(); //加后缀参数防止缓存

              loading.dismiss();
            },
            error => this.errorMessage = < any > error);
      }
    });
  }

  updateNickName() {
    this.storage.get("token").then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadCtrl, "修改中...");
        this.rest.updateNickName(this.nickname, val)
          .subscribe(
            f => {
              if (f["status_code"] == "666") {
                loading.dismiss();
                super.showToast(this.toastCtrl, "昵称修改成功！");
                this.viewCtrl.dismiss();
              } else {
                loading.dismiss();
                super.showToast(this.toastCtrl, f["message"]);
              }
            },
            err => {
              //console.log(err.substring(0,3));
              this.errorMessage = < any > err;
              if (err.substring(0, 3) == "401") {
                //console.log(1);
                this.storage.remove('token');
                loading.dismiss();
                super.showToast(this.toastCtrl, "您的登陆信息已过期，请重新登陆。");
              }
            })
      }
    });
  }


  logout() {
    this.storage.remove('token');
    this.viewCtrl.dismiss();
  }
}
