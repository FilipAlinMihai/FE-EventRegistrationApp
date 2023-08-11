export class User {
    id: number;
    name: string;
    password: string;
    email: string;
    balance: number;
    profileImage: string;
  
    constructor(id: number, name: string, password: string, email: string, balance: number, profileImage: string) {
      this.id = id;
      this.name = name;
      this.password = password;
      this.email = email;
      this.balance = balance;
      this.profileImage = profileImage;
    }
  
    print(){
      console.log(this.name);
    }
  }
  