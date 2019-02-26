import { TestBed } from '@angular/core/testing';

import { RegisterPersonService } from './register-person.service';

describe('RegisterPersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterPersonService = TestBed.get(RegisterPersonService);
    expect(service).toBeTruthy();
  });
});
