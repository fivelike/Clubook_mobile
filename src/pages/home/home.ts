import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content, Tabs, ModalController, ToastController,LoadingController } from 'ionic-angular';
import { CreatepassagePage } from '../createpassage/createpassage';
import { DetailsPage } from '../details/details';
import { CommentPage } from '../comment/comment';
import { ClubdetailsPage } from '../clubdetails/clubdetails';
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

  gotoDetails(){
    //this.navCtrl.push(DetailsPage, { id: questionId });
    this.navCtrl.push(DetailsPage);
  }


  createPassage(){
    this.storage.get('token').then((val) => {
      if (val != null) {
        let modal = this.modalCtrl.create(CreatepassagePage);
        modal.present();
      }else{
        super.showToast(this.toastCtrl,"请登陆后发布...")
      }
    });
    
  }

  showCommentPage(){
    let modal = this.modalCtrl.create(CommentPage);
    modal.present();
  }

  pushClubDetails() {
    this.navCtrl.push(ClubdetailsPage);
  }

  doRefresh(refresher) {
    this.passages=[];
    this.getPassageFeeds();
    refresher.complete();
  }

}
