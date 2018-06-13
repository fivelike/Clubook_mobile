import {
  Component, Input
} from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  ModalController,
  ToastController,
  ViewController
} from 'ionic-angular';
import {
  BaseUI
} from '../../common/baseui';
import {
  Storage
} from '@ionic/storage';
import {
  RestProvider
} from '../../providers/rest/rest';
import { DetailsPage } from '../../pages/details/details';

@Component({
  selector: 'my-list',
  templateUrl: 'my-list.html'
})
export class MyListComponent extends BaseUI{

  text: string;
  //dataType外部传递进来的，dataSourceType本地接受后的参数名
  @Input('datatype') dataSourceType;

  errorMessage: any;
  passages: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl: LoadingController,
    public modalCtrl: ModalController,
    public rest: RestProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {
    super();
  }

  //组件这里没有生命周期函数
  // ngAfterContentInit() {
  //   this.storage.get('token').then((val) => {
  //     if (val != null) {
  //       let loading = super.showLoading(this.loadCtrl, "加载中...");
  //       this.rest.getUserQuestionList(val, this.dataSourceType)
  //         .subscribe(q => {
  //           this.passages = q;
  //           loading.dismissAll();
  //         },
  //           error => this.errorMessage = <any>error);
  //     }
  //   });
  // }

  // gotoDetails(questionId) {
  //   this.navCtrl.push(DetailsPage, { id: questionId });
  // }

}
