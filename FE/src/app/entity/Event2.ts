export class Event2 {
    id: number;
    name: string;
    type:string;
    rooms:number;
    dateE:Date;
    privateE:boolean;
    fee:number;
  
    constructor(id: number, name: string, type:string,rooms:number,dateE:Date,privateE:boolean,fee:number) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.rooms = rooms;
      this.dateE=dateE;
      this.privateE=privateE;
      this.fee=fee;
    }
  
    print(){
      console.log(this.name);
    }
  }