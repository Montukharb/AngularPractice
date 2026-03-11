import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { USER_DETAILS } from '../tokens/userDetails.token';
import { inject } from '@angular/core';

export const userDetailResolver: ResolveFn<String> = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
     
  const userDetails = inject(USER_DETAILS);
  return JSON.stringify(userDetails);

};






// observable ho tab hi use hoga pipe
// export const userResolver: ResolveFn<any> =
// (route)=>{

//  const service = inject(UserService)
//  const router = inject(Router)

//  return service.getUser().pipe(

//   catchError(()=>{

//    return of(new RedirectCommand(router.parseUrl('/users')))

//   })

//  )

// }