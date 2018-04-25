import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content, Tabs } from 'ionic-angular';
@Component({
  selector: 'page-circle',
  templateUrl: 'circle.html',
})
export class CirclePage {

  @ViewChild(Content) content: Content;
  public display: boolean = true;

  circle: string = "recommend";

  public circles: any;
  constructor(public navCtrl: NavController,
    public ngzone: NgZone) {

    this.circles = [
      { "name": "圈子1" },
      { "name": "圈子2" },
      { "name": "圈子3" },
      { "name": "圈子4" },
      { "name": "圈子5" },
      { "name": "圈子6" },
      { "name": "圈子7" },
      { "name": "圈子8" }
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
  //隐藏tabs
  hiddenTabs(p: boolean) {
    let t: Tabs = this.navCtrl.parent;
    t.setTabbarHidden(p);
  }

}
