import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFilmeComponent } from './card-filme/card-filme.component';



@NgModule({
  declarations: [
    CardFilmeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    CardFilmeComponent
  ]
})
export class SharedModule { }
