import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SpinnerService } from './loading.service';

describe('LoadingService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('должен быть установлен в true при появлении потока', (done) => {
    const result: boolean[] = [];
    const ob$ = of(null);
    service.loading$.subscribe((data) => {
      result.push(data);
      if (result.length === 3) {
        expect(result).toEqual([false, true, false]);
        done();
      }
    });
    service.showLoaderUntilCompleted(ob$).subscribe();
  });
});
