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
  BaseUI
} from '../../common/baseui';
import {
  RestProvider
}
from '../../providers/rest/rest';
import {
  Storage
} from '@ionic/storage';

@Component({
  selector: 'page-createclub',
  templateUrl: 'createclub.html',
})
export class CreateclubPage extends BaseUI {

  public name: string;
  public brief: string;
  public errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController) {
    super();
  }

  createClub() {
    if (this.name == null) {
      super.showToast(this.toastCtrl, "社团名称不能为空...");
      return;
    }
    if (this.brief == null) {
      super.showToast(this.toastCtrl, "社团描述不能为空...");
      return;
    }
    this.storage.get("token").then((val) => {
      if(val != null){
        var loading = super.showLoading(this.loadingCtrl,"创建中...");
        this.rest.createClub(val,this.name,this.brief).subscribe(
          f=>{
            if (f["status_code"] == "666"){
              loading.dismiss();
              super.showToast(this.toastCtrl, "创建成功！");
              this.dismiss();
            }else{
              loading.dismiss();
              super.showToast(this.toastCtrl, f["message"]);
            }
          },
          error=>{
            this.errorMessage = <any>error;
            if (error.substring(0, 3) == "401") {
              //console.log(1);
              this.storage.remove('token');
              loading.dismiss();
              super.showToast(this.toastCtrl, "您的登陆信息已过期，请重新登陆。");
            }
          }
        );
      }else{
        super.showToast(this.toastCtrl, "请登陆后进行创建...");
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
