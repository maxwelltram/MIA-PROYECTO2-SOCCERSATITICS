import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisionVisionPageRoutingModule } from './mision-vision-routing.module';

import { MisionVisionPage } from './mision-vision.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisionVisionPageRoutingModule
  ],
  declarations: [MisionVisionPage]
})
export class MisionVisionPageModule {}
