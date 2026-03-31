import { Component, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import Lenis from '@studio-freight/lenis'; //smooth scroll karne ka liya importing library
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


 //lenis for smooth scroll library   
if (isPlatformBrowser(this.platformid)) {
  const lenis = new Lenis({
    duration: 0.8,          // Scroll kitni der tak chalega (seconds mein)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function (custom curve)
    orientation: 'vertical', // 'vertical' ya 'horizontal'
    gestureOrientation: 'vertical',
    smoothWheel: true,      // Mouse wheel scroll smooth karein
    wheelMultiplier: 1.4,     // Scroll ki speed (1 se zyada matlab fast)
    touchMultiplier: 2,     // Touch devices par sensitivity
    infinite: false,        // Kya scroll infinite hona chahiye?
    lerp: 0.3,              // Interpolation (0.1 slow/smooth hai, 1 fast hai)
  });

  // Animation Loop
  const raf = (time: any) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
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
//this is router events 
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