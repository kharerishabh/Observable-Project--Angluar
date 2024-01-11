import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter, interval, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    //this.firstSubscription = interval(1000).subscribe(count => console.log(count))
    //Custom Observable
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 3) {
          observer.complete();
        }
        if (count > 4) {
          observer.error(new Error('Count is greater than 4'));
        }
        count++;
      }, 1000);
    });

    this.firstSubscription = customIntervalObservable
      .pipe(filter((data: number) => {
        return data > 0
      }),
        map((data: number) => {
          return 'Round: ' + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          alert(error.message);
        },
        () => {
          console.log('Completed');
        }
      );
  }
  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();
  }
}
