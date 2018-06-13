import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  ModalController,
  ToastController,
  LoadingController
} from 'ionic-angular';
import {
  CommentPage
} from '../comment/comment';
import {
  DetailsPage
} from '../details/details';
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
  selector: 'page-clubdetails',
  templateUrl: 'clubdetails.html',
})
export class ClubdetailsPage extends BaseUI {
  public passages: any;
  public clubId: string;
  public club: any;
  public errorMessage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: Storage) {
    super();
  }

  ionViewDidLoad() {
    this.clubId = this.navParams.get('id');
    this.loadClubDate();
    this.getPassageFeeds();
  }

  loadClubDate() {
    this.rest.getClubById(this.clubId)
      .subscribe(
        f => {
         // console.log(f);
          if (f["status_code"] == 666) {
            this.club = f["community"];
          } else {
            super.showToast(this.toastCtrl, f["message"]);
          }
        }
      );
  }
  getPassageFeeds(){
    let loading = super.showLoading(this.loadingCtrl, "数据加载中...");
    this.rest.getClubPassages(this.clubId).subscribe(
      f => {
        console.log("获取文章");
        console.log(f);
        if (f["status_code"] == 666) {
          this.passages = f["articles"];
          loading.dismiss();
        } else {
          loading.dismiss();
          super.showToast(this.toastCtrl, f["message"]);
        }
      },
      error => this.errorMessage = <any>error
    );
  }

  gotoDetails() {
    //this.navCtrl.push(DetailsPage, { id: questionId });
    this.navCtrl.push(DetailsPage);
  }
  showCommentPage() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.present();
  }

  join() {
    this.storage.get('token').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl, "加入中...");
        this.rest.joinClub(val, this.clubId).subscribe(
          f => {
            if (f["status_code"] == 666) {
              loading.dismiss();
              super.showToast(this.toastCtrl, "加入成功！");
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f["message"]);
            }
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
