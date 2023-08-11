import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/User.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private route:Router,private userService: UserService) { }

  ngOnInit(): void {
  }


  signin(name:string,email:string,pas1:string,pas2:string)
  {
    const expression: RegExp =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if(expression.test(email))
    {
      if(pas1===pas2 && pas1!="")
      {

        this.userService.check(email).subscribe(
          (response) => {
            if (response != null)
            {
              window.alert("The email address is unavailable.");
              return;
            }
          const hashedString = CryptoJS.SHA256(pas1).toString(CryptoJS.enc.Hex);
          this.userService.addUser(name,email,hashedString).subscribe(
          (response) => {
            if (response == null)
            {
              window.alert("Could not create account");
              return;
            }
            console.log("answear was recieved");
            this.route.navigate(["base"]);
          }
        )
          }
        );

      }
      else
      {
        window.alert("Parole diferite");
      }
    }
    else
    {
      window.alert("Email incorect");
    }
    
  }

}
