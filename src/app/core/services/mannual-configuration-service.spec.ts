import { TestBed } from '@angular/core/testing';

import { MannualConfigurationService } from './mannual-configuration-service';

describe('MannualConfigurationService', () => {
  let service: MannualConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MannualConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
