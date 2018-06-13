import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content, Tabs, ModalController, ToastController,LoadingController } from 'ionic-angular';
import { CreatepassagePage } from '../createpassage/createpassage';
import { DetailsPage } from '../details/details';
import { CommentPage } from '../comment/comment';
import { ClubdetailsPage } from '../clubdetails/clubdetails';
import { CircledetailsPage } from '../circledetails/circledetails';
import {
  RestProvider
} from '../../providers/rest/rest';
import {
  Storage
} from '@ionic/storage';
import {
  BaseUI
} from '../../common/baseui';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI{
  @ViewChild(Content) content: Content;

  public display:boolean = true;

  public passages:any;
  public errorMessage: any;

  constructor(public navCtrl: NavController,
  public ngzone:NgZone,
  public modalCtrl:ModalController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage) {
    super();
  }

  ionViewDidLoad(){
    this.getPassageFeeds();
  }


  getPassageFeeds(){
    let loading = super.showLoading(this.loadingCtrl, "数据加载中...");
    this.rest.getPassages().subscribe(
      f=>{
        console.log(f);
        if(f["status_code"]==666){
          this.passages = f["articles"];
          loading.dismiss();
        }else{
          loading.dismiss();
          super.showToast(this.toastCtrl, f["message"]);
        }
      },
      error => this.errorMessage = <any>error
    );
  }

  scrollHandler(e){
    this.ngzone.run(() => {
      if (this.content.directionY == "down"){
        // console.log("down");
        this.display=false;
        this.hiddenTabs(true);
        this.content.resize();
      } else{
        this.display = true;
        this.hiddenTabs(false);
        this.content.resize();
      }
    })
  }

  ionViewWillLeave() {
    if(!this.display){
      this.display=true;
      this.hiddenTabs(false);
    }
  }

  hiddenTabs(p:boolean){
    let t:Tabs=this.navCtrl.parent;
    t.setTabbarHidden(p);
  }

  gotoDetails(id){
    this.navCtrl.push(DetailsPage,{id:id});
  }


  createPassage(){
    this.storage.get('token').then((val) => {
      if (val != null) {
        let modal = this.modalCtrl.create(CreatepassagePage);
        modal.present();
      }else{
        super.showToast(this.toastCtrl,"请登陆后发布...");
      }
    });
    
  }

  showCommentPage(id){
    this.storage.get('token').then((val) => {
      if (val != null) {
        let modal = this.modalCtrl.create(CommentPage, { "id": id });
        modal.present();
      } else {
        super.showToast(this.toastCtrl, "请登陆后评论...");
      }
    });
  }

  pushClubDetails(type,id) {
    if (type =="community"){
      this.navCtrl.push(ClubdetailsPage,{id:id});
    } else if (type == "circle"){
      this.navCtrl.push(CircledetailsPage,{ id: id });
    }
    
  }

  doRefresh(refresher) {
    this.passages=[];
    this.getPassageFeeds();
    refresher.complete();
  }

  like(id,p){
    this.storage.get('token').then((val) => {
      if(val!=null){
        let loading = super.showLoading(this.loadingCtrl, "点赞中...");
        this.rest.like(val,id).subscribe(
          f=>{
            if(f["status_code"]==666){
              loading.dismiss();
              super.showToast(this.toastCtrl, "点赞成功！");
              //console.log(this.passages.indexOf(p));
              this.passages[this.passages.indexOf(p)].likes++;
            }else{
              loading.dismiss();
              super.showToast(this.toastCtrl, f["message"]);
            }
          },
          error => this.errorMessage = <any>error
        );
      }else{
        super.showToast(this.toastCtrl, "请登陆后点赞...")
      }
    });
  }

}
