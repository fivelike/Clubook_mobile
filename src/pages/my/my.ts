import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  ModalController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import {
  RestProvider
} from '../../providers/rest/rest';
import {
  UserPage
} from '../user/user';
import {
  LoginPage
} from "../login/login";
import {
  Storage
} from '@ionic/storage';
import {
  BaseUI
} from '../../common/baseui';
import {
  UserdatalistPage
} from '../userdatalist/userdatalist';


@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage extends BaseUI {

  public notLogin: boolean = true;
  public logined: boolean = false;
  headface: string;
  userinfo: string[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public storage: Storage) {
    super();
  }


  ionViewDidLoad() {
    this.loadUserPage();
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    //关闭后的回调
    modal.onDidDismiss(() => {
      this.loadUserPage();
    });
    modal.present();
  }


  loadUserPage() {
    this.storage.get('token').then((val) => {
      if (val != null) {
        //加载用户数据
        let loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserInfo(val)
          .subscribe(userinfo => {

            this.userinfo = userinfo;
            this.headface = userinfo["IconUrl"] + "?" + (new Date()).valueOf(); //加后缀参数防止缓存
            this.storage.set('headface', this.headface);
            this.storage.set('username', userinfo["name"]);
            this.notLogin = false;
            this.logined = true;
            loading.dismiss();
          },
        err=>{
          //console.log(err.substring(0,3));
          if (err.substring(0, 3)=="401"){
            //console.log(1);
            this.storage.remove('token');
            this.notLogin = true;
            this.logined = false;
            loading.dismiss();
            super.showToast(this.toastCtrl, "您的登陆信息已过期，请重新登陆。");
          }
        });
      } else {
        this.notLogin = true;
        this.logined = false;
      }
    });
  }

  gotoUserPage() {
    this.navCtrl.push(UserPage);

  }

  doRefresh(refresher) {
    this.loadUserPage();
    refresher.complete();
  }

  gotoDataList(type) {
    this.navCtrl.push(UserdatalistPage, {
      "dataType": type
    });
  }

}
