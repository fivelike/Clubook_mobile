import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyListComponent } from './my-list/my-list';
@NgModule({
	declarations: [MyListComponent],
	imports: [IonicPageModule.forChild(MyListComponent)],
	exports: [MyListComponent]
})
export class ComponentsModule {}
