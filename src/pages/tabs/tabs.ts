import { Component } from '@angular/core';

import { CirclePage } from '../circle/circle';
import { ClubPage } from '../club/club';
import { NotificationsPage } from '../notifications/notifications';
import { MyPage } from '../my/my';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ClubPage;
  tab3Root = CirclePage;
  tab4Root = NotificationsPage;
  tab5Root = MyPage;
  constructor() {

  }
}
