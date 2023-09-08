import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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


}
