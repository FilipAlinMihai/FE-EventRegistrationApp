import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css'],
})
export class NeweventComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    
  }

  finish(coordonator:string,nameroom:string,numberR:string){
      console.log(coordonator);
      console.log(nameroom);
      console.log(numberR);
  }

  next(){
    
  }

}
