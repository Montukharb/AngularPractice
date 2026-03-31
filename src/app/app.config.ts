import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withNavigationErrorHandler, withViewTransitions } from '@angular/router';
// import { APP_CONFIG } from './core/tokens/app.token';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

//custom injection token imports
import { API_URL } from './core/tokens/app.token';
import { LOCAL_STORAGE } from './core/tokens/app.token';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { APP_CONFIG } from './core/tokens/app.token';
import { USER_DETAILS } from './core/tokens/userDetails.token';
import { Router } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerSetterInterceptor } from './core/interceptors/header-setter-interceptor';
// import { provideLoadingBarRouter } from '@ngx-loading-bar/router';
// npm install @ngx-loading-bar/core @ngx-loading-bar/router --save
export const appConfig: ApplicationConfig = {
  providers: [
   provideHttpClient(
    withFetch(),
    withInterceptors([  //interceptors register kar diya hai
         headerSetterInterceptor, //ab ye har request ka header ko change kar dega .
    ])
  
  ), //http client enable here with modern fetch method
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,
      
      withViewTransitions(), //router animation enable karne ka liya
      withComponentInputBinding(), // component me input accept karne ka liya direct way
      withInMemoryScrolling({
        
        anchorScrolling:'enabled', // with in memory scrolling se auto scroll enable hoga jab bhi params se fragment aye ga direct scroll ho jaye ga
      }),
      withNavigationErrorHandler((error)=> {
         const router = inject(Router);

        console.log('Navigation Error: ', error)
        router.navigate(['/error']);  //error page abhi nahi is liya pagenot found par jaye ga
      
      })), //withNavigationErrorHandler
    // provideLoadingBarRouter(), //router par navigation lagane ka liya  error de rahi hai mannual kar liya

    provideClientHydration(withEventReplay()),
    
    {
      provide: API_URL,
      useValue: 'https://jsonplaceholder.typicode.com'
    },
    {
      provide: USER_DETAILS,
      useValue:
       { "name": "John Doe", "age": 30, "city": "New York" }  //injectionToken ki data pass hua hai
      
    },
    {
      provide: APP_CONFIG,
      useValue:{
        apiUrl:'https://jsonplaceholder/typicode/etc/sfa.com',
        name: 'Mr. lost world'
      }
    },
    {
      provide:LOCAL_STORAGE,
        useFactory:()=> 
        {

          const platformid = inject(PLATFORM_ID);
          if(isPlatformBrowser(platformid))
          {

            return window.localStorage 
          }
          return null;
        }
      }

  
  ]
};
