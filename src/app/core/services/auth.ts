import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  protected platformid = inject(PLATFORM_ID);
  login(){
    if(isPlatformBrowser(this.platformid))
    {
      localStorage.setItem('isLoggedIn', 'true');
    }
  }
  

  logout(){
    if(isPlatformBrowser(this.platformid))
    {
      localStorage.setItem('isLoggedIn', 'false');
    }
    
  }
}
