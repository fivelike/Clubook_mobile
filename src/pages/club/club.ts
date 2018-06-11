import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content, Tabs, ModalController } from 'ionic-angular';
import { CreateclubPage } from '../createclub/createclub';
import { ClubdetailsPage } from '../clubdetails/clubdetails';
@Component({
  selector: 'page-club',
  templateUrl: 'club.html',
})
export class ClubPage {
  @ViewChild(Content) content: Content;
  public display: boolean = true;

  club: string = "recommend";

  public clubs:any;
  constructor(public navCtrl: NavController,
    public ngzone: NgZone,
    public modalCtrl: ModalController) {

      this.clubs = [
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

  createClub() {
    let modal = this.modalCtrl.create(CreateclubPage);
    modal.present();
  }

  pushClubDetails() {
    this.navCtrl.push(ClubdetailsPage);
  }

}
