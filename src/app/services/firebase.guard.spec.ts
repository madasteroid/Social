import { TestBed } from '@angular/core/testing';

import { FirebaseGuard } from './firebase.guard';

describe('FirebaseGuard', () => {
  let guard: FirebaseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirebaseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
