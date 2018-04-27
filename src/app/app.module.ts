import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { CirclePage } from '../pages/circle/circle';
import { ClubPage } from '../pages/club/club';
import { NotificationsPage } from '../pages/notifications/notifications';
import { UserPage } from '../pages/user/user';
import { CreatepassagePage } from '../pages/createpassage/createpassage';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CirclePage,
    ClubPage,
    NotificationsPage,
    UserPage,
    TabsPage,
    CreatepassagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CirclePage,
    ClubPage,
    NotificationsPage,
    UserPage,
    TabsPage,
    CreatepassagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
