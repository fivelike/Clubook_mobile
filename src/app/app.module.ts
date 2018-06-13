import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { CirclePage } from '../pages/circle/circle';
import { ClubPage } from '../pages/club/club';
import { NotificationsPage } from '../pages/notifications/notifications';
import { UserPage } from '../pages/user/user';
import { MyPage } from '../pages/my/my';
import { CreatepassagePage } from '../pages/createpassage/createpassage';
import { CreateclubPage } from '../pages/createclub/createclub';
import { CreatecirclePage } from '../pages/createcircle/createcircle';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DetailsPage } from '../pages/details/details';
import { CommentPage } from '../pages/comment/comment';
import { ClubdetailsPage } from '../pages/clubdetails/clubdetails';
import { CircledetailsPage } from '../pages/circledetails/circledetails';
import { TabsPage } from '../pages/tabs/tabs';
import { HeadfacePage } from '../pages/headface/headface';
import { UserdatalistPage } from '../pages/userdatalist/userdatalist';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';

import { ComponentsModule } from '../components/components.module';

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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    CirclePage,
    ClubPage,
    NotificationsPage,
    UserPage,
    TabsPage,
    CreatepassagePage,
    CreateclubPage,
    CreatecirclePage,
    LoginPage,
    RegisterPage,
    CommentPage,
    ClubdetailsPage,
    CircledetailsPage,
    HeadfacePage,
    UserdatalistPage,
    MyPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpModule, //全局需要导入HTTP
    IonicStorageModule.forRoot(), //全局定义storage的模块
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages:true, //隐藏全部子页面tabs
      backButtonText: "返回",
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    CirclePage,
    ClubPage,
    NotificationsPage,
    UserPage,
    TabsPage,
    CreatepassagePage,
    CreateclubPage,
    CreatecirclePage,
    LoginPage,
    RegisterPage,
    CommentPage,
    ClubdetailsPage,
    CircledetailsPage,
    HeadfacePage,
    UserdatalistPage,
    MyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    File,
    FileTransfer,
    FilePath,
    Camera,
  ]
})
export class AppModule {}
