import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/**
 * Service for declarativly handle Observable subscriptions.
 *
 * @example
 *
 * @Component({
 *   //...
 *   providers: [NgxDestroy]
 * })
 * export class SomeComponent() {
 *
 *   constructor(private readonly destroy$: NgxDestroy) {}
 *   observable$ = interval(1000)
 *        .pipe(takeUntil(this.destroy$))
 * }
 */
@Injectable()
export class NgxDestroy
  extends ReplaySubject<void>
  implements OnDestroy
{
  constructor() {
    super(1);
  }

  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
