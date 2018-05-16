import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateclubPage } from './createclub';

@NgModule({
  declarations: [
    CreateclubPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateclubPage),
  ],
})
export class CreateclubPageModule {}
