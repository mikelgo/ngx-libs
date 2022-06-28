import { NgxDestroy } from './ngx-destroy.service';
import { finalize, Observable, of, takeUntil, timer } from 'rxjs';

describe('NgxDestroyService', () => {
  let service: NgxDestroy;

  beforeEach(() => {
    service = new NgxDestroy();
  });

  it('should keep the subscription when not destroyed', () => {
    let result = 'initial';
    const observable$: Observable<string> = of<string>('test');

    observable$.pipe(takeUntil(service)).subscribe((data) => {
      result = data;
    });

    expect(result).toBe('test');
  });

  it('completes Observable on destroy', () => {
    let result = false;

    const observable$: Observable<unknown> = timer(2000).pipe(
      takeUntil(service),
      finalize(() => {
        result = true;
      })
    );

    observable$.subscribe();
    service.ngOnDestroy();

    expect(result).toBe(true);
  });
});
