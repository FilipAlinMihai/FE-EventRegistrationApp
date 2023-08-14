import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from '../services/User.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor( private router: Router,private userService:UserService,private localStore:LocalService) { }

  ngOnInit(): void {
  }

  login(user:string,pas:string){
    console.log(user);
    console.log(pas);
    this.userService.findUser(user,pas).subscribe(
      (response) => {
        if (response == null)
        {
          window.alert("Could not find account");
          console.log("answear was not recieved");
          return;
        }
        console.log("answear was recieved");
        this.localStore.saveData("userId", String(response.id));
        this.localStore.saveData("email", response.email)
        this.router.navigate(['base']);
      }
    )
    
  }

  signin(){
    this.router.navigate(['signin']);
  }

}
