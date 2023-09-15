import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../services/Invitation.service';
import { LocalService } from '../services/local.service';
import { Invitation } from '../entity/Invitation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privateevents',
  templateUrl: './privateevents.component.html',
  styleUrls: ['./privateevents.component.css']
})
export class PrivateeventsComponent implements OnInit {

  constructor(private router: Router,private localStore:LocalService,private inviteService:InvitationService) { }

  ngOnInit(): void {
    this.getAllInvits();
  }

  getAllInvits()
  {
    this.inviteService.getInvitations(Number(this.localStore.getData("userId"))).subscribe(
      (response: Invitation[]) => {
        response.forEach(
          (invitation:Invitation)=>{
              this.addPrivateEvent(invitation.event.id,invitation.event.name,invitation.event.rooms,
                invitation.event.type,invitation.event.privateE);
          }
        );
      });
  }

  addPrivateEvent(id:number,name:string,rooms:number,type:string,priv:boolean)
  {
    const box = document.getElementById('events') as HTMLDivElement;
    var product = document.createElement('div');
    product.classList.add("event");
    product.innerHTML=`<p >Eveniment: ${name}</p><p >Camere: ${rooms}</p><p >Tip: ${type}</p><p >Private: ${priv}</p>`;
    product.addEventListener('click', () => this.eventPage(id));
    box.appendChild(product)
  }

  eventPage(id: number){
    this.localStore.saveData('eventID', String(id));
    this.router.navigate(['event']);
  }

}
