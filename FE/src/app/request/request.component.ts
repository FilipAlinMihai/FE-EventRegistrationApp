import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/User.service';
import { RequestService } from '../services/Request.service';
import { LocalService } from '../services/local.service';
import { FriendService } from '../services/Friend.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  id1:any;
  constructor(private route:Router,private userService: UserService,private requestService: RequestService,
    private localStore:LocalService,private friendService:FriendService) { }

  ngOnInit(): void {
  }

  sendRequest (email:string){

    this.id1=this.localStore.getData("userId");


    this.userService.check(email).subscribe(
      (response) => {
        if (response == null)
        {
          window.alert("This user does not exist.");
          return;
        }

        if(Number(this.id1)==Number(response.id))
        {
          window.alert("Incorect email!!");
          return;
        }

      this.friendService.check(Number(this.id1),Number(response.id)).subscribe(
        (response1) => {
          if (response1 != null)
          {
            window.alert("You are already friends!");
            return;
          }

          this.requestService.check(Number(this.id1),Number(response.id)).subscribe(
            (response3) => {
              if (response3 != null)
              {
                window.alert("Request already sent!");
                return;
              }
  
              this.requestService.addRequest(Number(this.id1),Number(response.id)).subscribe(
                (response2) => {
                  if (response2 == null)
                  {
                    window.alert("Could not create request!");
                    console.log(""+Number(this.id1)+" "+Number(response.id));
                    return;
                  }
                  console.log("answear was recieved");
                  this.route.navigate(["base"]);
                }
              )
              
    
    
            }
            );


        }
        );
      }
    );


  }

}
