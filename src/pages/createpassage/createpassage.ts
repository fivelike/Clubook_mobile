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

  public title:string;
  public body:string;

  public errorMessage: any;
  headface: string = "assets/imgs/test.jpg";
  username: string = "发布文章";

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


  ionViewDidEnter() {
    this.storage.get('username').then((val) => {
      if(val!=null){
        //console.log(val);
        this.username = val;
      }
    });
    this.storage.get('headface').then((val) => {
      if (val != null) {
        //console.log(val);
        this.headface = val;
      }
    });
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
        super.showToast(this.toastCtrl, "请登陆后操作...");
      }
    });
  }

  showCheckbox(){
    let alert = this.alertCtrl.create();
    alert.setTitle('你想将消息发布到哪里?');
    for (var f of this.clubFeeds.concat(this.circleFeeds)){
      if (this.submitTo.includes(f)){
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

  submit(){
    if(this.title==""){
      super.showToast(this.toastCtrl, "标题不能为空...");
      return;
    }
    if (this.body == "") {
      super.showToast(this.toastCtrl, "内容不能为空...");
      return;
    }
    if (this.submitTo.length == 0) {
      super.showToast(this.toastCtrl, "请选择发布可见位置...");
      return;
    }
    this.storage.get('token').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl, "发布中...");
        this.rest.writeArticle(val,this.title,this.body,this.returnTo()).subscribe(
          f=>{
            console.log(f);
            if (f["status_code"] == "666") {
              loading.dismiss();
              super.showToast(this.toastCtrl, "发布成功！");
              this.dismiss();
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f["message"]);
            }
          },
          error => {
            this.errorMessage = <any>error;
            if (error.substring(0, 3) == "401") {
              //console.log(1);
              this.storage.remove('token');
              loading.dismiss();
              super.showToast(this.toastCtrl, "您的登陆信息已过期，请重新登陆。");
            }
          }
        );
      } else {
        super.showToast(this.toastCtrl, "请登陆后操作...");
      }
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
    
  }

  returnTo():any{
    let to = [];
    for(let t of this.submitTo){
      to.push({"id":t.id,"type":t.type});
    }
    console.log(to);
    return to;
  }
}
