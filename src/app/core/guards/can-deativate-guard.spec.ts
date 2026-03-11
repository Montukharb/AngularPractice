import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canDeativateGuard } from './can-deativate-guard';

describe('canDeativateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canDeativateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
