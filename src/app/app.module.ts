import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app.routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {MoviesListModule} from "./pages/movies-list/movies-list.module";

@NgModule({
    declarations: [AppComponent, MoviesListComponent],
    bootstrap: [AppComponent],
  imports: [
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MoviesListModule
  ]
})
export class AppModule { }
