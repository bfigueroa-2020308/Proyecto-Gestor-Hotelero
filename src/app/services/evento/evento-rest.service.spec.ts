import { TestBed } from '@angular/core/testing';

import { EventoRestService } from './evento-rest.service';

describe('EventoRestService', () => {
  let service: EventoRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
