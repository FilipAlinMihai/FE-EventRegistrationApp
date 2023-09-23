import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/User.service';
import { LocalService } from '../services/local.service';
import { User } from '../entity/User';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(private router: Router,private userService:UserService,private localStore:LocalService) { }

  ngOnInit(): void {
  }

  reset(email:string,token:string,password:string,newpassword:string,confpassword:string){

    if(newpassword===confpassword &&  newpassword!="")
      {
    this.userService.updatePassword(token, CryptoJS.SHA256(newpassword).toString(CryptoJS.enc.Hex)).subscribe(
      (response: User) => {
          if (response == null)
          {
            return;
          }
          this.router.navigate(['index']);
      }
    );
      }
      else{
        window.alert("Parole diferite");
      }

  }

}
