import {
  Component,
  NgZone,
  ViewChild
} from '@angular/core';
import {
  NavController,
  Content,
  Tabs,
  ModalController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import {
  CreateclubPage
} from '../createclub/createclub';
import {
  ClubdetailsPage
} from '../clubdetails/clubdetails';
import {
  BaseUI
} from '../../common/baseui';
import {
  RestProvider
} from '../../providers/rest/rest';
@Component({
  selector: 'page-club',
  templateUrl: 'club.html',
})
export class ClubPage extends BaseUI {
  @ViewChild(Content) content: Content;
  public display: boolean = true;

  club: string = "recommend";

  public recommendFeeds: any;
  public memberFeeds: any;
  public myFeeds: any
  public errorMessage: any;

  constructor(public navCtrl: NavController,
    public ngzone: NgZone,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController) {
    super();
  }
  ionViewDidLoad() {
    this.getFeeds();
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

  pushClubDetails(clubId) {
    this.navCtrl.push(ClubdetailsPage, {id: clubId});
  }


  getFeeds() {
    let loading = super.showLoading(this.loadingCtrl, "数据加载中...");
    this.rest.getClubList().subscribe(
      f => {
        if (f["status_code"]==666){
          console.log(f);
          this.recommendFeeds = f["communities"];
        }else{
          loading.dismiss();
          super.showToast(this.toastCtrl, f["message"]);
        }
        //loading.dismiss();
      },
      error => this.errorMessage = < any > error
    );
  }

}
