import { Component, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { PLATFORM_ID } from '@angular/core';
import { Navbar } from './core/layout/navbar/navbar/navbar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar,], //importing component, directive, pipe in standalone component.
  templateUrl: './app.html',
  styleUrl: './app.css',
  // host:{
  //   '(window:scroll)':'scrollfun()'
  // }
 
})
export class App {
  protected platformid = inject(PLATFORM_ID);
  
  status = signal(true);
  
  ngOnInit()
  {

  if(isPlatformBrowser(this.platformid))
    {
      window.onscroll = () => {
        if(window.scrollY > 300)
          {
            this.status.set(false);          
          }
          else{
            this.status.set(true);
          } 
      }
    }
  }
 goToTop()
 {
   window.scrollTo({
    top: 0,
    behavior:'smooth',
   })
 }

 isLoadingProgressiveBar = signal(false);

 protected router = inject(Router);
 private minimumLoaderTimer:any 

 constructor(){
  this.router.events.subscribe((event)=>{
    if(event instanceof NavigationStart)
    {

        this.isLoadingProgressiveBar.set(true);
   
    }
    else if(event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel)
    {
      clearTimeout(this.minimumLoaderTimer);  //user multiple time click kar sakte hi is liya settime out se uppar clear kiya hai or multiple set timeout create na ho
      this.minimumLoaderTimer = setTimeout(()=>{
        this.isLoadingProgressiveBar.set(false);
      },700);
      
    }
  })
 }

}