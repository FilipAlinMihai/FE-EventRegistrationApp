import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';
import { RequestService } from '../services/Request.service';
import { UserService } from '../services/User.service';
import { Request2 } from '../entity/Request2';
import { FriendService } from '../services/Friend.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  id: any;

  constructor(private router: Router,public localStore:LocalService,private requestService:RequestService,
    private userService:UserService, private friendService:FriendService) { }

  ngOnInit(): void {
    this.getAllMyRequests();
  }

  getAllMyRequests(){
    this.id = Number(this.localStore.getData("userId"));
    this.requestService.getAllMyRequests(this.id).subscribe(
      (response: Request2[]) => {

        response.forEach((request: Request2) => {
          
          this.userService.getUser(Number(request.user1.id)).subscribe(
            (response2) => {
              if (response2 == null)
              {
                window.alert("Could not post request!");
                return;
              }

              this.addRequest(Number(request.id),Number(request.user1.id),Number(request.user2.id),response2.name,response2.email);
            }
          )

        });
      }
    );
  }
  addFriend(idr:number,id1:number,id2:number){
    
    this.friendService.addEvent(id1,id2).subscribe(
      (response2) => {
        if (response2 == null)
        {
          window.alert("Could not add Friend!");
          return;
        }

        this.requestService.deleteRequest(idr).subscribe(
          (response3) => {
            if (response3 == null)
            {
              window.alert("Could not delete!");
              return;
            }
    
            window.location.reload();
          }
        )
      }
    )
    

  }

  addRequest(idr:number,id1: number, id2: number, name: string, email: string) {
    const box = document.getElementById('myrequests') as HTMLDivElement;
    const product = document.createElement('div');
    product.classList.add('request');
    
    // Create a button element and set its attributes
    const button = document.createElement('button');
    button.textContent = 'Accepta';
    button.addEventListener('click', () => this.addFriend(idr,id1, id2)); // Use event listener
    
    // Create the rest of the content
    product.innerHTML = `<p>Cerere de la: ${name} !</p><p>Email: ${email} !</p>`;
    product.appendChild(button); // Append the button to the product
    
    box.appendChild(product);
  }

 

}
