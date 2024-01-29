import { TestBed } from '@angular/core/testing';

import { PubnubService } from './pub-nub.service';

describe('PubNubService', () => {
  let service: PubnubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubnubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
