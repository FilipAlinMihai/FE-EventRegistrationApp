import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { BookingService } from '../services/Booking.service';
import { Booking } from '../entity/Booking';
import { EventService } from '../services/Event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(private localStorage:LocalService,private bookingService:BookingService,
    private eventService:EventService,private router:Router) { }

  ngOnInit(): void {
    if (this.localStorage.getData("email") == "null" || this.localStorage.getData("email") == null)
    {
      this.router.navigate(['index']);
      return;
    }

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

        const dateStr = response.dateE; 
        const date1 = new Date(dateStr);
        const date2 = new Date();
        console.log(date1.getTime());


        const timeDifferenceInMilliseconds = date2.getTime() - date1.getTime();


        const millisecondsInDay = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
        const millisecondsInHour = 60 * 60 * 1000; // 60 minutes * 60 seconds * 1000 milliseconds
        const millisecondsInMinute = 60 * 1000; // 60 seconds * 1000 milliseconds
        
        const absoluteDifferenceInMilliseconds = Math.abs(timeDifferenceInMilliseconds);
        const differenceInDays = Math.floor(absoluteDifferenceInMilliseconds / millisecondsInDay);
        const remainingMilliseconds = absoluteDifferenceInMilliseconds % millisecondsInDay;
        
        const differenceInHours = Math.floor(remainingMilliseconds / millisecondsInHour);
        const remainingMilliseconds2 = remainingMilliseconds % millisecondsInHour;
        
        const differenceInMinutes = Math.floor(remainingMilliseconds2 / millisecondsInMinute);

        const box = document.getElementById('bookings') as HTMLDivElement;
        var product = document.createElement('div');
        product.classList.add("request");
        product.innerHTML=`<p >Event: ${response.name}</p><p >Room ID: ${room}</p><p >Seats: ${seats}</p>
        <p >Remaining Days: ${differenceInDays}; Hours: ${differenceInHours}; Minutes: ${differenceInMinutes+1}</p>`;
        box.appendChild(product)

      });

  }
}
