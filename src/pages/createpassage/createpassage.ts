import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';


@Component({
  selector: 'page-createpassage',
  templateUrl: 'createpassage.html',
})
export class CreatepassagePage {

  public feeds:any;
  public submitTo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl:ViewController,
    public alertCtrl: AlertController) {
      this.feeds=[
        {"name":"社团1","id":"1"},
        { "name": "社团2", "id": "2" },
        { "name": "社团3", "id": "3" },
        { "name": "社团4", "id": "4" },
        { "name": "社团5", "id": "5" },
        { "name": "社团6", "id": "6" },
      ];
      this.submitTo=[];
  }

  ionViewDidLoad() {

  }

  showCheckbox(){
    let alert = this.alertCtrl.create();
    alert.setTitle('你想将消息发布到哪里?');
    for(var f of this.feeds){
      if (this.submitTo.includes(f.id)){
        alert.addInput({
          type: 'checkbox',
          label: f.name,
          value: f.id,
          checked: true
        });
      }else{
        alert.addInput({
          type: 'checkbox',
          label: f.name,
          value: f.id,
        });
      }

    }
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        console.log('Checkbox data:', data);
        this.submitTo = data;
      }
    });
    alert.present();
    
  }

  dismiss(){
    this.viewCtrl.dismiss();
    
  }
}
