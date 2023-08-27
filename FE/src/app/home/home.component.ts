import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { EventService } from '../services/Event.service';
import { LocalService } from '../services/local.service';
import { Event2 } from '../entity/Event2';
//import { Event } from '../entity/Event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id:number=0;

  constructor(private router: Router,private eventService:EventService,public localStore:LocalService) { }

  ngOnInit(): void {

    this.getAllMyEvents();
  }

  back(){
    this.router.navigate(['']);
  }
  
  getAllMyEvents() {
    this.id = Number(this.localStore.getData("userId"));
    this.eventService.getAllMyEvents(this.id).subscribe(
      (response: Event2[]) => {
        console.log(response); // Log the response to see its structure
        response.forEach((event: Event2) => {
          this.addEvent(event.name, event.rooms, event.type);
        });
      }
    );
  }
  

  addEvent(name:string,rooms:number,type:string){
    const box = document.getElementById('myevents') as HTMLDivElement;
    var product = document.createElement('div');
    product.classList.add("event");
    product.innerHTML=`<p >Eveniment: ${name}</p><p >Camere: ${rooms}</p><p >Tip: ${type}</p>`;
    box.appendChild(product)
  }

}
