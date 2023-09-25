import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,private localStore:LocalService) { }

  ngOnInit(): void {
    
    var userName = this.localStore.getData("userName") || "NAME"
    if (userName == "null")
      userName = "NAME"

    var intials = userName.charAt(0);
    var intials = intials.toUpperCase();
  
    var userProfileImage = document.getElementById("profileImage") as HTMLImageElement
    userProfileImage.src ="../assets/PozeLitereProfil/"+intials+".png";

  }

  add(){
    this.router.navigate(["add"]);
  }

  request()
  {
    this.router.navigate(["request"]);
  }

  requests()
  {
    this.router.navigate(["requests"]);
  }

  friends(){
    this.router.navigate(["friends"]);
  }

  events(){
    this.router.navigate(["events"]);
  }

  reservations(){
    this.router.navigate(["reservations"]);
  }

  profile(){
    this.router.navigate(["profile"]);
  }

  privateEvents(){
    this.router.navigate(["privatevents"]);
  }


}
