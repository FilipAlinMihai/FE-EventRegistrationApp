import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }
  
  public saveData(key: string, value: string) {
    console.log("key: " + key + " val: " + value)
    sessionStorage.setItem(key, value);
  }

  public getData(key: string) {
    console.log("key: " + key + " val: " + sessionStorage.getItem(key))
    return sessionStorage.getItem(key)
  }
  public removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearData() {
    sessionStorage.clear();
  }
}