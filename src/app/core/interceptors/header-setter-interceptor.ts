import { HttpInterceptorFn } from '@angular/common/http';

export const headerSetterInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    // body: req.body
  })
  
  console.log(req.urlWithParams);
  return next(req);
};









// import { inject } from '@angular/core';
// import { HttpInterceptorFn, HttpErrorResponse, HttpEventType } from '@angular/common/http';
// import { tap, catchError, finalize } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { LoadingService } from './loading.service'; // Maan lijiye aapka loading service hai

// export const globalInterceptor: HttpInterceptorFn = (req, next) => {
//   const loader = inject(LoadingService);
  
//   // 1. Request bhejte hi Spinner ON karo
//   loader.show();

//   return next(req).pipe(
//     // 2. Response check karne ke liye (tap)
//     tap((event) => {
//       if (event.type === HttpEventType.Response) {
//         console.log('API Success:', req.url, event.body);
//       }
//     }),

//     // 3. Global Error handle karne ke liye (catchError)
//     catchError((error: HttpErrorResponse) => {
//       if (error.status === 401) {
//         alert('Session Expired! Please Login Again.');
//         // Yahan logout logic daal sakte hain
//       } else if (error.status === 500) {
//         alert('Server down hai, thodi der baad try karein.');
//       }
      
//       // Error ko component tak pass karo taaki wo bhi handle kar sake
//       return throwError(() => error);
//     }),

//     // 4. Request khatam hote hi (Success ya Error dono cases mein) Spinner OFF karo
//     finalize(() => {
//       loader.hide();
//     })
//   );
// };
