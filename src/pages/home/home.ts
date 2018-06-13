import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content, Tabs, ModalController, ToastController } from 'ionic-angular';
import { CreatepassagePage } from '../createpassage/createpassage';
import { DetailsPage } from '../details/details';
import { CommentPage } from '../comment/comment';
import { ClubdetailsPage } from '../clubdetails/clubdetails';
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

  constructor(public navCtrl: NavController,
  public ngzone:NgZone,
  public modalCtrl:ModalController,
    public toastCtrl: ToastController,
    public storage: Storage) {
    super();
    this.passages = [
      { "name": "社团1" },
      { "name": "社团2" },
      { "name": "社团3" },
      { "name": "社团4" },
      { "name": "社团5" },
      { "name": "社团6" },
      { "name": "社团7" },
      { "name": "社团8" }
    ];
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
    refresher.complete();
  }

}
