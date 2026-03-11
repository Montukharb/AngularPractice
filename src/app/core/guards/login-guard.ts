import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
export const loginGuard: CanActivateFn = (route, state) => {
   
  let  platformid = inject(PLATFORM_ID)
  let router = inject(Router);
  if(isPlatformBrowser(platformid))
  {
    let status = localStorage.getItem('isLoggedIn');
    if(status === 'true')
    {
      return router.createUrlTree(['/dashboard']);
    }
    return true;
  }
  return true;

};
