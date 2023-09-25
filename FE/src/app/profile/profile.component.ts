import { Component, OnInit } from '@angular/core';
import { User } from '../entity/User';
import { UserService } from '../services/User.service';
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router,private userService:UserService,private localStore:LocalService) { }

  ngOnInit(): void {

    if (this.localStore.getData("email") == "null" || this.localStore.getData("email") == null)
    {
      this.router.navigate(['index']);
      return;
    }

    this.userService.getUser(Number(this.localStore.getData("userId"))).subscribe(

      (response) =>{
        if(response==null)
        {
          window.alert("Could not find User!");
          return;
        }
         
        var title = document.getElementById("title") as HTMLImageElement;
          if(title)
          {
              title.innerHTML="Welcome "+response.name;
          }

          var title = document.getElementById("email") as HTMLImageElement;
          if(title)
          {
              title.innerHTML="You use the nex email adres: "+response.email;
          }

        
      }

    );
    var userName = this.localStore.getData("userName") || "NAME"
    if (userName == "null")
      userName = "NAME"

    var intials = userName.charAt(0);
    var intials = intials.toUpperCase();
  
    var userProfileImage = document.getElementById("profileImage") as HTMLImageElement
    userProfileImage.src ="../assets/PozeLitereProfil/"+intials+".png";
  }

  updatePassword(){
    this.userService.recoverPassword(String(this.localStore.getData("email"))).subscribe(
      (response: User) => {
          if (response == null)
          {
            return;
          }
          this.router.navigate(['reset']);
      }
    );
  }

  updateEmail()
  {
    
  }

}
