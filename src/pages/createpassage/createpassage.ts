import { Component } from '@angular/core';
import {
  NavController, NavParams, ViewController, AlertController, LoadingController,
  ToastController  } from 'ionic-angular';
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
  selector: 'page-createpassage',
  templateUrl: 'createpassage.html',
})
export class CreatepassagePage extends BaseUI{

  public clubFeeds:any;
  public circleFeeds:any;
  public submitTo:any;

  public errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl:ViewController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public storage: Storage) {
    super();
      this.submitTo=[];
  }

  ionViewDidLoad() {
    this.getGroups()
  }

  getGroups(){
    this.storage.get('token').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl, "数据加载中...");
        this.rest.getMyGroups(val).subscribe(
          f => {
            if (f["status_code"] == 666) {
              console.log(f);
              loading.dismiss();
              this.clubFeeds=f["communities"];
              this.circleFeeds = f["circles"];
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f["message"]);
            }
          },
          err => {
            //console.log(err.substring(0,3));
            this.errorMessage = <any>err;
            if (err.substring(0, 3) == "401") {
              //console.log(1);
              this.storage.remove('token');
              //loading.dismiss();
              super.showToast(this.toastCtrl, "您的登陆信息已过期，请重新登陆。");
            }
          }
        );
      } else {
        super.showToast(this.toastCtrl, "请登陆后查看...");
      }
    });
  }

  showCheckbox(){
    let alert = this.alertCtrl.create();
    alert.setTitle('你想将消息发布到哪里?');
    for (var f of this.clubFeeds){
      if (this.submitTo.includes(f.id)){
        alert.addInput({
          type: 'checkbox',
          label: f.name,
          value: f,
          checked: true
        });
      }else{
        alert.addInput({
          type: 'checkbox',
          label: f.name,
          value: f,
        });
      }

    }
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        console.log('Checkbox data:', data);
        this.submitTo = data;
      }
    });
    alert.present();
  }

  dismiss(){
    this.viewCtrl.dismiss();
    
  }
}
