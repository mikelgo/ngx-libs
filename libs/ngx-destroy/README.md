# ngx-destroy

Utility service to manage subscriptions in a declarative way using takeUntil.

To handle subscriptions in a declarative way usually you do have following code:

```typescript
import { OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  //...
})
export class SomeComponent implements OnDestroy {
  private readonly destroy$ = new Subject();

  constructor() {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(// do smth.)
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

With `NgxDestroy` you reduce a lot of boilerplate:

```typescript
import { interval } from 'rxjs';
import { NgxDestroy } from '@mikelgo/ngx-destroy';

@Component({
  //...
  providers: [NgxDestroy]
})
export class SomeComponent {
  
  constructor(private readonly destroy$: NgxDestroy) {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(// do smth.)
  }
  
}
```
