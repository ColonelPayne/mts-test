import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import {MoviesListRoutingModule} from "./movies-list.routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MovieComponent
  ],
  exports: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    MoviesListRoutingModule,
    FormsModule
  ]
})
export class MoviesListModule { }
