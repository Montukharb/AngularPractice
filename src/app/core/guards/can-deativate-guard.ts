
import { CanDeactivateFn } from '@angular/router';

import { ChildA } from '../layout/sidebar/child-a/child-a';

export const canDeativateGuard: CanDeactivateFn<ChildA> = (component: ChildA) => {
  
  if(component.leaveUser() === true)
  {
    return true;
  }
  return false;

};
