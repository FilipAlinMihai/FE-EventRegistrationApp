export class Event2 {
    id: number;
    name: string;
    type:string;
    rooms:number;
  
    constructor(id: number, name: string, type:string,rooms:number) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.rooms = rooms;
    }
  
    print(){
      console.log(this.name);
    }
  }