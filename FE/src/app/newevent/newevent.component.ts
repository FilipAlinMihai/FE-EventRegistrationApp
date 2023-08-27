import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/Room.service';
import { Room } from '../entity/Room';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css'],
})
export class NeweventComponent implements OnInit {

  val:number=0;
  data: any; 
  key1:any;
  key2:any;
  key3:any;

  v1:any;
  v2:any;
  v3:any;
  constructor(private localStore:LocalService,private router: Router,private roomService:RoomService) { }

  ngOnInit(): void {

     this.data = history.state.dataKey;
  }

  finish(coordonator:string,nameroom:string,numberR:string){

    if(coordonator!="" && nameroom!="" && numberR!="")
    {
      this.val=Number(this.localStore.getData("eventroom"));
    if(this.val<Number(this.data))
    {
      console.log(coordonator);
      console.log(nameroom);
      console.log(numberR);

      this.key1="coordonator"+this.val;
      this.key2="nameroom"+this.val;
      this.key3="numberR"+this.val;

      this.localStore.saveData(this.key1, coordonator);
      this.localStore.saveData(this.key2, nameroom);
      this.localStore.saveData(this.key3, numberR);

      this.val=this.val+1;
      this.localStore.saveData("eventroom", String(this.val));
      this.updateCount(this.val);
      console.log(this.val);
    }
    else
    {
      window.alert("All the rooms have been created.");
    }
    }
    else{
      window.alert("Empty field!");
    }

      
  }

  next(){
    
    if(Number(this.localStore.getData("eventroom"))!=this.data)
    {
      window.alert("Insuficient rooms!");
    }
    else{
      for(let i = 0; i < Number(this.data); i++)
      {
          this.key1="coordonator"+i;
          this.key2="nameroom"+i;
          this.key3="numberR"+i;

          this.v1=this.localStore.getData(this.key1);
          this.v2=this.localStore.getData(this.key2);
          this.v3=this.localStore.getData(this.key3);

          this.roomService.addRoom(this.v2,this.v1,this.v3,Number(this.localStore.getData("eventId"))).subscribe(
            (response: Room) => {
              if (response == null)
              {
                  window.alert("Could not find account");
                  return;
              }
              this.router.navigate(["base"]);
            }
          );

      }
    }
  }

  updateCount(value:number){
    const box = document.getElementById('count') as HTMLDivElement;
    box.innerHTML=`<p>Create</p> <h1 id='counvalue'>${value}</h1>`;
  }

  restart(){
    this.localStore.saveData("eventroom", "0");

    for(let i = 0; i < Number(this.data); i++)
    {
      this.key1="coordonator"+i;
      this.key2="nameroom"+i;
      this.key3="numberR"+i;

      this.localStore.saveData(this.key1, "");
      this.localStore.saveData(this.key2, "");
      this.localStore.saveData(this.key3, "");

    }
    this.updateCount(0);


  }

}
