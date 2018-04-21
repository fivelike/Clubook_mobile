import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController,Content, Tabs } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  public display:boolean = true;


  constructor(public navCtrl: NavController,
  public ngzone:NgZone) {

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

  hiddenTabs(p:boolean){
    let t:Tabs=this.navCtrl.parent;
    t.setTabbarHidden(p);
  }


}
