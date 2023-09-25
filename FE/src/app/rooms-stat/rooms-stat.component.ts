import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/User.service';
import { LocalService } from '../services/local.service';
import { RoomService } from '../services/Room.service';
import { Room } from '../entity/Room';

@Component({
  selector: 'app-rooms-stat',
  templateUrl: './rooms-stat.component.html',
  styleUrls: ['./rooms-stat.component.css']
})
export class RoomsStatComponent implements OnInit {

  constructor(private router: Router,private roomService:RoomService,private localStore:LocalService) { }

  ngOnInit(): void {

    if (this.localStore.getData("email") == "null" || this.localStore.getData("email") == null)
    {
      this.router.navigate(['index']);
      return;
    }

    var title = document.getElementById("title") as HTMLImageElement;
          if(title)
          {
              title.innerHTML="Rooms of the event";
          }

    this.getAllRooms();
  }

  getAllRooms(){

    this.roomService.getRooms(Number(this.localStore.getData("eventID"))).subscribe(
      (response: Room[]) => {
        if (response == null)
        {
          window.alert("Problem!");
          return;
        }

        response.forEach((room: Room) => {
          this.addRoom(room.id,room.name,room.coordinator,room.seats,room.occupied);
        });
    
      }
    );

  }

  addRoom(id:number,name:string,cord:string,seats:number,occupied:number)
  {

    const box = document.getElementById('rooms') as HTMLDivElement;
    var product = document.createElement('div');
    var rem=seats-occupied;
    product.classList.add("room");
    product.innerHTML=`<p >Room: ${name}</p><p >Room ID: ${id}</p><p >Coordinator: ${cord}</p><p >Seats: ${seats}</p><p >Empty Seats: ${rem}</p>`;
    box.appendChild(product)

  }

}
