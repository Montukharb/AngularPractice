import { TestBed } from '@angular/core/testing';

import { BasicDataStore } from './basic-data-store';

describe('BasicDataStore', () => {
  let service: BasicDataStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicDataStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
