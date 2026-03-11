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
            return true;
         }
         else if(status === 'false')
            {  
               return router.createUrlTree(['/login']);
            }
   }

   return router.createUrlTree(['/login']);

};
