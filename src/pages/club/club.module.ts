import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClubPage } from './club';

@NgModule({
  declarations: [
    ClubPage,
  ],
  imports: [
    IonicPageModule.forChild(ClubPage),
  ],
})
export class ClubPageModule {}
