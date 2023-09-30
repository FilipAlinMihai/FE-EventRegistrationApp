import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';
import { EventService } from '../services/Event.service';
import { Event2 } from '../entity/Event2';
import { RoomService } from '../services/Room.service';
import { BookingService } from '../services/Booking.service';
import { Booking } from '../entity/Booking';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.css']
})
export class EventpageComponent implements OnInit {

  paymentHandler:any = null;
  key = "pk_test_51Nv56vHlvwOEhFiMoUNd8yGJSXvecUYHtsY6Bxikf05J2buIMrl4WGXKbdbWW2JmxGvHUhbuLcNPU3WxlUFl0Yh200vV2oP3rr";
  
  fee:any;
  eventid:any;

  constructor(private router: Router,private localStore:LocalService,private eventService:EventService,
    private roomService:RoomService,private bookingService:BookingService) { }

  ngOnInit(): void {

    if (this.localStore.getData("email") == "null" || this.localStore.getData("email") == null)
    {
      this.router.navigate(['index']);
      return;
    }

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

          var title = document.getElementById("fee") as HTMLImageElement;
          if(title)
          {
              title.innerHTML="Fee: "+response.fee;
          }

          this.fee=response.fee;
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

        this.invokeStripe();
  }

  reservation(seats:string,room:string){

    if(Number(this.fee)==0)
    {
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
    else{
      this.initializePayment(Number(this.fee)*Number(seats),seats,room);
    }
  }

  roomsStatistics(){
    this.router.navigate(["rooms"]);
  }

  okpayment(seats:string,room:string) {
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

  initializePayment(amount: number, seats: string, room: string) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.key,
      locale: 'auto',
      token: (stripeToken: any) => { 
        console.log({ stripeToken });
        console.log('Stripe token generated!');
        this.okpayment(seats, room);
      }
    });
  
    paymentHandler.open({
      name: this.localStore.getData("userName"),
      description: "Buy a seat",
      amount: amount * 100
    });
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.key,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

}
