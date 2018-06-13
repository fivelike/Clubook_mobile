import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-userdatalist',
  templateUrl: 'userdatalist.html',
})
export class UserdatalistPage {
  dataType: string;
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataType = navParams.get('dataType');
    switch (this.dataType) {
      case "write": this.title = "我的文章"; break;
      case "like": this.title = "我的点赞"; break;
      case "comment": this.title = "我的评论"; break;
    }
  }

}
