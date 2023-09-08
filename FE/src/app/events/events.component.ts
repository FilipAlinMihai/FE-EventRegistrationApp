import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { FriendService } from '../services/Friend.service';
import { Friend } from '../entity/Friend';
import { EventService } from '../services/Event.service';
import { Event2 } from '../entity/Event2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  id:any;
  constructor(private router: Router,private friendService:FriendService,private localStore:LocalService,private eventService:EventService) { }

  ngOnInit(): void {

    this.friendsEvents();
  }

  friendsEvents()
  {
    this.id = Number(this.localStore.getData("userId"));
    this.friendService.getAll(this.id).subscribe(
      (response: Friend[]) => {

        response.forEach((friend: Friend) => {
          if(friend.user2.id==this.id)
            this.findFriendEvents(friend.user1.id);
          else
          {
            this.findFriendEvents(friend.user2.id);
          }
        });
      }
    );
  }

  findFriendEvents(id:number)
  {
    this.eventService.getAllMyEvents(id).subscribe(
      (response: Event2[]) => {

        response.forEach((event: Event2) => {
          this.addFriendEvent(event.id,event.name, event.rooms, event.type);
        });
      }
    );
  }


  addFriendEvent(id:number,name:string,rooms:number,type:string){
    const box = document.getElementById('friendEvents') as HTMLDivElement;
    var product = document.createElement('div');
    product.classList.add("event");
    product.innerHTML=`<p >Eveniment: ${name}</p><p >Camere: ${rooms}</p><p >Tip: ${type}</p>`;
    product.addEventListener('click', () => this.eventPage(id));
    box.appendChild(product)
  }

  eventPage(id: number){
    this.localStore.saveData('eventID', String(id));
    this.router.navigate(['event']);
  }

}
