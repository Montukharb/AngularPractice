import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
// import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
export const canActivateGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
     
   // let auth = inject(Auth);
   let router = inject(Router);
   let platformid = inject(PLATFORM_ID);
   if(isPlatformBrowser(platformid))
   {

      let status = localStorage.getItem('isLoggedIn');
      if(status === 'true')
         {
            return true;  //ha user logged in hai to dashboard page open ho jaye ga
         }
         else if(status === 'false')
            {  
               return router.createUrlTree(['/login']);  //login nahi to redirect to login page not open dashboard page
            }
   }

   return router.createUrlTree(['/login']);  //ye tab apply hoga jab user server side rendering kar raha ho ya localstorage available nahi hai to direct login page open ho jaye ga

};
