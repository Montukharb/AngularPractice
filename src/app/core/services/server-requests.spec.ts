import { TestBed } from '@angular/core/testing';

import { ServerRequests } from './server-requests';

describe('ServerRequests', () => {
  let service: ServerRequests;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerRequests);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
