import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateComponent } from './create/create.component';
import { NeweventComponent } from './newevent/newevent.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {path: 'index', component: LogComponent},
  {path: 'base', component: HomeComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'add', component: CreateComponent},
  {path: 'new', component: NeweventComponent},
  {path: 'signin', component: SigninComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    HomeComponent,
    NavbarComponent,
    CreateComponent,
    NeweventComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
