import { Component } from '@angular/core';
import { Highlight } from '../shared/directives/highlight';
class Base{
  protected basevalue:string = "this is base class value 😒";
}
function testing()
{
  console.log("this is testing function");
}
@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
  // hostDirectives:[Highlight] // isme input output binding work nahi karga kyuki direct possible nahi hai isko expand karo
  hostDirectives:[
    {
      directive:Highlight,
      // inputs:['appHighlight'],
      // outputs:[],  
    }
  ]
})
export class Card extends Base{
   cardtext:string = "this is card component";
   constructor(){
    super(); //parent class constructor call using super keyword
    testing();
   } 

   
}
