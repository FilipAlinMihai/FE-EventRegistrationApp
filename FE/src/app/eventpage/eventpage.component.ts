import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';
import { EventService } from '../services/Event.service';
import { Event2 } from '../entity/Event2';
import { RoomService } from '../services/Room.service';
import { BookingService } from '../services/Booking.service';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.css']
})
export class EventpageComponent implements OnInit {


  eventid:any;

  constructor(private router: Router,private localStore:LocalService,private eventService:EventService,
    private roomService:RoomService,private bookingService:BookingService) { }

  ngOnInit(): void {

    if (this.localStore.getData("eventID") == "null" || this.localStore.getData("eventID") == null)
      {
        this.router.navigate(['base']);
        return;
      }

      this.eventid=this.localStore.getData("eventID");

      this.eventService.get(this.eventid).subscribe(
        (response : Event2) =>{

          var title = document.getElementById("title") as HTMLImageElement;
          if(title)
          {
              title.innerHTML=response.name;
          }
          var title = document.getElementById("rooms") as HTMLImageElement;
          if(title)
          {
              title.innerHTML="Rooms: "+response.rooms;
          }
        });


        this.roomService.roomsSeats(Number(this.localStore.getData("eventID"))).subscribe(
          (response1) => {
            if (response1 == null)
            {
              window.alert("Could not find Seats!");
              return;
            }
            var title = document.getElementById("seats") as HTMLImageElement;
          if(title)
          {
              title.innerHTML="Total number of Seats: "+response1;
          }
          }
        );

        this.roomService.roomsEmptySeats(Number(this.localStore.getData("eventID"))).subscribe(
          (response2) => {
            if (response2 == null)
            {
              window.alert("Could not find Seats!");
              return;
            }
            var title = document.getElementById("empty") as HTMLImageElement;
          if(title)
          {
              title.innerHTML="Available seats: "+response2;
          }
          }
        );
  }

  reservation(seats:string,room:string){

    this.bookingService.find(Number(this.localStore.getData("userId")),Number(room)).subscribe(
      (response3) => {
        if (response3 != null)
        {
          window.alert("You have seats for this event!");
          return;
        }

        this.roomService.takeSeat(Number(room),Number(seats)).subscribe(
          (response) => {
            if (response == -1)
            {
              window.alert("Could not reserve seats!");
              return;
            }
            if (response == -2)
            {
              window.alert("Not enough seats in this room!");
              return;
            }
            this.bookingService.addBooking(Number(this.localStore.getData("userId")),Number(room),Number(seats)).subscribe(
              (response2) => {
                if (response2 == null)
                {
                  window.alert("Could not add booking!");
                  return;
                }
    
                window.alert("OK");
              }
            );
          }
        );

      }
    );

  }

  roomsStatistics(){
    this.router.navigate(["rooms"]);
  }

}
