import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',

  /* "providedIn: 'root' → 1 singleton for entire app
'platform' → 1 singleton for all apps on same page  
'any' → Separate instance per lazy-loaded module

root most common hai, platform Angular Elements ke liye,
any lazy module isolation ke liye." */

})

export class BasicDataStore {
    
  private data:number[] = [] //store data here
  
  public addData(item:number):void{
    this.data.push(item);  //insert data 
  }

  //getter function return data ;
   public getData():number[]
  {
    return [...this.data];  //return an array and pass spread operator which is copied all items from data variable of number of array;
    //spread operator se another services ka data ko copy karke eak function me bhi bind kar sakte hai;
  }
}
