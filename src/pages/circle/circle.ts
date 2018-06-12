import { Component, NgZone, ViewChild } from '@angular/core';
import {
  NavController,
  Content,
  Tabs,
  ModalController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { CreatecirclePage } from '../createcircle/createcircle';
import { CircledetailsPage } from '../circledetails/circledetails';
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
  selector: 'page-circle',
  templateUrl: 'circle.html',
})
export class CirclePage extends BaseUI{

  @ViewChild(Content) content: Content;
  public display: boolean = true;

  circle: string = "recommend";

  public recommendFeeds: Array<any> = [];
  public memberFeeds: Array<any> = [];
  public myFeeds: Array<any> = []
  public errorMessage: any;

  constructor(public navCtrl: NavController,
    public ngzone: NgZone,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public storage: Storage) {
    super();
  }



  ionViewDidLoad() {
    this.getFeeds();
  }

  getFeeds() {
    let loading = super.showLoading(this.loadingCtrl, "数据加载中...");
    this.rest.getCircleList().subscribe(
      f => {
        if (f["status_code"] == 666) {
          console.log(f);
          this.recommendFeeds = f["circle"];
        } else {
          //loading.dismiss();
          super.showToast(this.toastCtrl, f["message"]);
        }
        //loading.dismiss();
      },
      error => this.errorMessage = <any>error);
      this.storage.get('token').then((val) => {
        if (val != null) {
          this.rest.getMyGroups(val).subscribe(
            f => {
              if (f["status_code"] == 666) {
                console.log(f);
                this.separateFeeds(f["circles"]);
              } else {
                //loading.dismiss();
                super.showToast(this.toastCtrl, f["message"]);
              }
              //loading.dismiss();
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
      loading.dismiss();
  }

  separateFeeds(Feeds: any) {
    for (let f of Feeds) {
      if (f.my_role == "creator") {
        this.myFeeds.push(f);
      } else {
        this.memberFeeds.push(f);
      }
    }
  }

  //滑动隐藏
  scrollHandler(e) {
    this.ngzone.run(() => {
      if (this.content.directionY == "down") {
        // console.log("down");
        this.display = false;
        this.hiddenTabs(true);
        this.content.resize();
      } else {
        this.display = true;
        this.hiddenTabs(false);
        this.content.resize();
      }
    })
  }
  ionViewWillLeave() {
    if (!this.display) {
      this.display = true;
      this.hiddenTabs(false);
    }
  }
  
  //隐藏tabs
  hiddenTabs(p: boolean) {
    let t: Tabs = this.navCtrl.parent;
    t.setTabbarHidden(p);
  }

  createCircle() {
    this.storage.get('token').then((val) => {
      if (val != null) {
        let modal = this.modalCtrl.create(CreatecirclePage);
        //关闭后的回调
        modal.onDidDismiss(() => {
          this.Refresh();
        });
        modal.present();
      } else {
        super.showToast(this.toastCtrl, "请登陆后查看...");
      }
    });

  }

  pushCircleDetails(circleId) {
        this.navCtrl.push(CircledetailsPage, { id: circleId });
  }

  doRefresh(refresher) {
    this.Refresh();
    refresher.complete();
  }

  Refresh() {
    this.recommendFeeds = [];
    this.memberFeeds = [];
    this.myFeeds = [];
    this.getFeeds();
  }

  join(id) {
    this.storage.get('token').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl, "加入中...");
        this.rest.joinCircle(val, id).subscribe(
          f => {
            if (f["status_code"] == 666) {
              loading.dismiss();
              super.showToast(this.toastCtrl, "加入成功！");
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f["message"]);
            }
            this.Refresh();
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

}
