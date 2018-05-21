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

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI{

  name: any;
  email:any;
  nickname: any;
  password: any;
  confirmPassword: any;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController) {
    super();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  doRegister() {
    //前台验证表单的正确性，包括手机号码，昵称的长度，密码的长度
    if (!this.email || !(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email))) {
      super.showToast(this.toastCtrl, "您的邮箱格式不正确！");
    } else if (!this.nickname || this.nickname.length < 3 || this.nickname.length > 10) {
      super.showToast(this.toastCtrl, "昵称的长度应该在 3 ~ 10 位之间！");
    } else if (!this.name || this.name.length < 3 || this.name.length > 10) {
      super.showToast(this.toastCtrl, "用户名的长度应该在 3 ~ 10 位之间！");
    } else if (!this.password || !this.confirmPassword || this.password.length < 6 || this.password.length > 20 ||
      this.confirmPassword.length < 6 || this.confirmPassword.length > 20) {
      super.showToast(this.toastCtrl, "密码的长度应该在 6 ~ 20 位之间！");
    } else if (this.password != this.confirmPassword) {
      super.showToast(this.toastCtrl, "两次输入的密码不一致!");
    } else {
      let loading = super.showLoading(this.loadingCtrl, "注册中...");
      this.rest.register(this.name, this.password, this.email,this.nickname)
        .subscribe(
          f => {
            if (f["status_code"] == "666") {
              loading.dismiss();
              super.showToast(this.toastCtrl, "注册成功");
              this.dismiss();
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f["message"]);
            }
          },
          error => this.errorMessage = <any>error);
    }
  }




  gotoLogin() {
    this.navCtrl.pop();
  }
}
