import { Component, computed, inject} from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router,  RouterLink } from "@angular/router";

@Component({
  selector: 'app-child-b',
  imports: [RouterLink],
  templateUrl: './child-b.html',
  styleUrl: './child-b.css',
})
export class ChildB {

  //accept resolver data using activated route 
  //there are two to access resolver data 1 = using activated route and data is available data object
  //2. using one way binding input signal there are no need any to inject or import in compoennt because input.requred<yaharesolver ka name dalo bas> input ma sare subcribe data mile ga isme bas eak change hog app.config file ma providers me router withComponentInputBinding(). 
 
  protected route = inject(ActivatedRoute);
  protected userDetails:any ;  
  router = inject(Router);
  ngOnInit()
  {
    
     this.userDetails = JSON.parse(this.route.snapshot.data['userDetails']);    //here tere are no need tu apply subscribe the api because resolver data is already subscribe through routes
     console.log(this.userDetails);
    console.log(this.userDetails?.name);  
    console.log(this.router.initialNavigation())
  } 
  
  // console.log(this.parseddata()?.name)
  // //2.way to access data 
  // strigifydata = input.required<string>();
  // // protected resolverData = JSON.parse(this.strigifydata();
  // parseddata = () => JSON.parse(this.strigifydata());
   isNavigation = computed(()=>{
      
       return !!this.router.currentNavigation();  //return kare ga bas kuch object ya null is liya ise boolean me convert kate hai !! double exclamation mark se
   })



   //Router Navigation how to subscribe

   constructor()
  {  //router class level par inject kiya hai inn events se top bar loader bhi show kar sakte hai
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationStart)
      {
        console.log("Navigation Start loading use kar sakte hai");
      }
      else if(event instanceof NavigationEnd)
      {
        console.log("Navigation End");
      }

    })
   }
}
