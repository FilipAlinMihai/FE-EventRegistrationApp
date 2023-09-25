import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/Friend.service';
import { LocalService } from '../services/local.service';
import { Friend } from '../entity/Friend';
import { UserService } from '../services/User.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  id:any;
  constructor(private router:Router,private friendService:FriendService,
    private localStore:LocalService,private userService:UserService) { }

  ngOnInit(): void {
    if (this.localStore.getData("email") == "null" || this.localStore.getData("email") == null)
    {
      this.router.navigate(['index']);
      return;
    }

    this.getAllMyFriends();
  }

  getAllMyFriends() {
    this.id = Number(this.localStore.getData("userId"));
    this.friendService.getAll(this.id).subscribe(
      (response: Friend[]) => {

        response.forEach((friend: Friend) => {
          if(friend.user2.id==this.id)
            this.addFriend(friend.user1.id);
          else
          {
            this.addFriend(friend.user2.id);
          }
        });
      }
    );
  }

  addFriend(id:number){

    this.userService.getUser(id).subscribe(
      (response2) => {
        if (response2 == null)
        {
          window.alert("User Not Found!");
          return;
        }

    const box = document.getElementById('friends') as HTMLDivElement;
    var product = document.createElement('div');
    product.classList.add("friend");
    product.innerHTML=`<p >Friend: ${response2.name}</p><p >Email: ${response2.email}</p>`;
    box.appendChild(product)
        
      }
    )

  }
  

}
