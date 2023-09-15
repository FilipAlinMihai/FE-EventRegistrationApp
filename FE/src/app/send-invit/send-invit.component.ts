import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../services/Invitation.service';
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';
import { Invitation } from '../entity/Invitation';
import { UserService } from '../services/User.service';
import { User } from '../entity/User';

@Component({
  selector: 'app-send-invit',
  templateUrl: './send-invit.component.html',
  styleUrls: ['./send-invit.component.css']
})
export class SendInvitComponent implements OnInit {

  constructor(private invitationService:InvitationService,private localStore:LocalService,
    private router: Router,private userService:UserService) { }

  ngOnInit(): void {
  }

  invite(friends:string)
  {

    const arrayFromString = friends.split(',');

    arrayFromString.forEach(
      (friend:string)=>{

        this.userService.check(friend).subscribe(
          (rez:User)=>{
            if(rez==null)
            {
              window.alert("No user was found for "+friend);
            }
            else
            {
              this.invitationService.addInvitation(Number(this.localStore.getData("userId")),
              rez.id,Number(this.localStore.getData("eventId"))).subscribe(
                (response: Invitation) => {
                  if(response==null)
                  {
                    window.alert("No invite was sent for "+friend);
                  }

                }
              );
            }  
          }
        );
      }
    );

    this.router.navigate(["base"]);
  }

}
