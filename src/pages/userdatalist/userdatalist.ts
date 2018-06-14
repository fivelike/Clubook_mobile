import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
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
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-userdatalist',
  templateUrl: 'userdatalist.html',
})
export class UserdatalistPage extends BaseUI {
  dataType: string;
  title: string;
  list:any=[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public storage: Storage) {
    super();
    this.dataType = navParams.get('dataType');
    switch (this.dataType) {
      case "write":
        this.title = "发布的文章";
        break;
      case "like":
        this.title = "我的点赞";
        break;
      case "comment":
        this.title = "评论的文章";
        break;
    }

  }

  ionViewDidLoad() {
    this.storage.get("token").then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getMyList(val).subscribe(f=>{
          console.log(f);
          if(f["status_code"]==666){
            if (this.dataType =="write"){
              this.list = f["written"];
            }else{
              this.list = f["commented"];
            }
            console.log(this.list);
          }else{
            super.showLoading(this.loadCtrl, f["message"]);
          }
        },
          err => {
            if (err.substring(0, 3) == "401") {
              this.storage.remove('token');
              super.showToast(this.toastCtrl, "您的登陆信息已过期，请重新登陆。");
            }
          });
      }
    });
  }

  gotoDetails(id) {
    this.navCtrl.push(DetailsPage, { id: id });
  }

}
