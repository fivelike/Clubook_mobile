import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  ActionSheetController,
  ToastController,
  LoadingController,
  ViewController,
  Platform,
  normalizeURL
} from 'ionic-angular';
import {
  Storage
} from '@ionic/storage';
import {
  RestProvider
} from '../../providers/rest/rest';
import {
  BaseUI
} from '../../common/baseui';
//导入四个外部加载的插件
import {
  Camera
} from '@ionic-native/camera';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from '@ionic-native/file-transfer';
import {
  File
} from '@ionic-native/file';
import {
  FilePath
} from '@ionic-native/file-path';

declare var cordova: any; //导入第三方的库的定义到TS项目

@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {

  token: string;
  errorMessage: string;
  lastImage: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public storage: Storage,
    public platform: Platform,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public camera: Camera,
    public transfer: FileTransfer, public file: File,
    public filePath: FilePath,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController) {
    super();
  }

  ionViewDidEnter() {
    this.storage.get('token').then((val) => {
      if (val != null) {
        this.token = val;
      }
    })
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [{
        text: '从图片库中选择',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: '使用相机',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: '取消',
        role: 'cancel'
      }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    //定义相机的一些参数
    let options = {
      quality: 100, //图片质量
      sourceType: sourceType,
      saveToPhotoAlbum: false, //是否保存拍摄的照片到相册中去
      correctOrientation: true, //是否修正拍摄的照片的方向
    };

    //获取图片的方法
    this.camera.getPicture(options).then((imagePath) => {
      //特别处理Android平台的文件路径问题
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath) //获取android平台下的真实路径
          .then(filePath => {
            //获取正确的路径
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            //获取正确的文件名
            let currentName = imagePath.substring(filePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.creatFileName());
          })
      } else {
        //获取正确的路径
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //获取正确的文件名
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.creatFileName());
      }
    }, err => {
      super.showToast(this.toastCtrl, "选择图片出现错误，请在App中操作或检查权限。");
    });
  }

  //将获取到的图片或者相机拍摄到的图片进行一下另存为，用于后期的图片上传使用
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(
      success => {
        this.lastImage = newFileName;
      },
      error => {
        super.showToast(this.toastCtrl, "存储图片到本地图库出现错误。");
      }
    );
  }

  //为文件生成一个新的文件名
  creatFileName() {
    let d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  //处理图片路径为可以上传的路径
  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return normalizeURL(cordova.file.dataDirectory + img);
    }
  }

  uploadImage() {
    var url = 'http://clubook.club/api/user/change_icon';
    var targetPath = this.pathForImage(this.lastImage);
    var filename = this.token + ".jpg" //定义上传后的文件名
    //上传的参数
    let options: FileUploadOptions = {
      fileKey: "image",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      //params: { 'fileName': filename, 'token': this.token }
      //params: { 'token': this.token },
      headers: { Authorization: "Bearer " + this.token}
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    let loading = super.showLoading(this.loadingCtrl, "上传中...");

    //开始正式上传
    fileTransfer.upload(targetPath, url, options).then(data => {
      loading.dismiss();
      super.showToast(this.toastCtrl, "图片上传成功。");
      //在用户看清弹窗提示后进行页面的关闭
      setTimeout(() => {
        this.viewCtrl.dismiss();
      }, 3000);
    }, err => {
      loading.dismiss();
      super.showToast(this.toastCtrl, "图片上传发生错误，请重试。");
    });
  }
}
