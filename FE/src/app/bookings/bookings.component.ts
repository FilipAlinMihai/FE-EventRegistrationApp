import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { BookingService } from '../services/Booking.service';
import { Booking } from '../entity/Booking';
import { EventService } from '../services/Event.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(private localStorage:LocalService,private bookingService:BookingService,
    private eventService:EventService) { }

  ngOnInit(): void {

    this.getAllBookings();

  }


  getAllBookings()
  {
    this.bookingService.getBookings(Number(this.localStorage.getData("userId"))).subscribe(
      (response:Booking[]) => {

        response.forEach((booking:Booking) => {
          
          this.addBoaking(booking.seats,booking.room.event.id,booking.room.id);
        });
      }
    );
  }

  addBoaking(seats:number,event:number,room:number)
  {

    this.eventService.get(event).subscribe(
      (response) => {

        if(response==null)
        {
          window.alert("No Event found!");
          return;
        }

        const box = document.getElementById('bookings') as HTMLDivElement;
        var product = document.createElement('div');
        product.classList.add("request");
        product.innerHTML=`<p >Event: ${response.name}</p><p >Room ID: ${room}</p><p >Seats: ${seats}</p>`;
        box.appendChild(product)

      });

  }
}
