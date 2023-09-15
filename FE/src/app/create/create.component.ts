import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { EventService } from '../services/Event.service';
import { LocalService } from '../services/local.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  n1:number=0;
  id:number=0;

  constructor(private router: Router,private eventService:EventService,private localStore:LocalService) { }


  ngOnInit(): void {
    this.localStore.saveData("eventroom", "0");
    console.log("ENTER CREATE");
  }

  creare(na:string,t:string,n:string,prv:string,dat:string){

    this.n1=Number(n);
    this.id=Number(this.localStore.getData("userId"));

    this.eventService.check(na,this.id).subscribe(
      (response) => {
        if (response != null)
        {
          window.alert("You have an event with this name.");
          return;
        }
        this.eventService.addEvent(na,t,this.n1,this.id,prv,dat).subscribe(
          (response2) => {
            if (response2 == null)
            {
              window.alert("Could not create event");
              console.log("answear was not recieved");
              return;
            }
            console.log("answear was recieved");
            this.localStore.saveData("eventroom", "0")
            this.localStore.saveData("eventId", String(response2.id));
            this.router.navigate(["new"],{ state: { dataKey:  n} });
          }
        )
      }
    );

    
  }

  back(){
    this.router.navigate(["base"]);
  }

}
