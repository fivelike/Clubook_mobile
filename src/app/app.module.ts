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
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';

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
    MyPage
  ],
  imports: [
    BrowserModule,
    HttpModule, //全局需要导入HTTP
    IonicStorageModule.forRoot(), //全局定义storage的模块
    IonicModule.forRoot(MyApp, {
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
    MyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
