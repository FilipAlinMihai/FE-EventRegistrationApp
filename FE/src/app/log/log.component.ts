import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from '../services/User.service';
import { LocalService } from '../services/local.service';
import { User } from '../entity/User';

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
        this.localStore.saveData("userName",response.name);
        this.router.navigate(['base']);
      }
    )
    
  }

  signin(){
    this.router.navigate(['signin']);
  }

  recover(email:string){
    if(email=="")
    {
      window.alert("Introduce an email adres first!");
      return;
    }
    this.userService.recoverPassword(email).subscribe(
      (response: User) => {
          if (response == null)
          {
            window.alert("Mail can't be send!");
            return;
          }
          this.router.navigate(['reset']);
      }
    );
  }

}
