import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClubdetailsPage } from './clubdetails';

@NgModule({
  declarations: [
    ClubdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClubdetailsPage),
  ],
})
export class ClubdetailsPageModule {}
