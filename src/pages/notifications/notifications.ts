import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams
} from 'ionic-angular';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  messages: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.messages = [{
        "icon": "assets/imgs/clubook.jpg",
        "title": "小觅音社团",
        "content": "发布了新的信息"
      },
      {
        "icon": "assets/imgs/clubook.jpg",
        "title": "二手书圈子",
        "content": "发布了新的信息"
      }, {
        "icon": "assets/imgs/clubook.jpg",
        "title": "书法社",
        "content": "发布了新的信息"
      }
    ];
  }
  delete(item){
    var index = this.messages.indexOf(item, 0);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
  }

}
