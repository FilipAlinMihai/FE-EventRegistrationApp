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
import { RequestComponent } from './request/request.component';
import { RequestsComponent } from './requests/requests.component';
import { FriendsComponent } from './friends/friends.component';
import { EventsComponent } from './events/events.component';
import { EventpageComponent } from './eventpage/eventpage.component';
import { RoomsStatComponent } from './rooms-stat/rooms-stat.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ProfileComponent } from './profile/profile.component';
import { SendInvitComponent } from './send-invit/send-invit.component';
import { PrivateeventsComponent } from './privateevents/privateevents.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {path: 'index', component: LogComponent},
  {path: 'base', component: HomeComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'add', component: CreateComponent},
  {path: 'new', component: NeweventComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'request', component: RequestComponent},
  {path: 'requests', component: RequestsComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'events', component: EventsComponent},
  {path: 'event', component: EventpageComponent},
  {path: 'rooms', component: RoomsStatComponent},
  {path: 'reservations', component: BookingsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'invitation', component: SendInvitComponent},
  {path: 'privatevents', component: PrivateeventsComponent},
  {path: 'reset', component: ResetComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    HomeComponent,
    NavbarComponent,
    CreateComponent,
    NeweventComponent,
    SigninComponent,
    RequestComponent,
    RequestsComponent,
    FriendsComponent,
    EventsComponent,
    EventpageComponent,
    RoomsStatComponent,
    BookingsComponent,
    ProfileComponent,
    SendInvitComponent,
    PrivateeventsComponent,
    ResetComponent
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
