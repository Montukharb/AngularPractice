import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })

@Injectable() //there is no need write @Injectable here its working by default

//this is called a mannual configuration service in angular isme service ka pass root nahi hota direct using compoenent me @component decorator ka ander providers property hoti hai wo array accept karti hai ausme service ki class ka name pass kare and use it normaly inject di


export class MannualConfigurationService {
   
    private masterName = "Dreams Come True"

    //return mastername using arrow function it's accessible any component root level in app
    public getMasterName = ():string => this.masterName;   

}
