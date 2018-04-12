
import { Component, OnInit, } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public seconds = 0;
  public srteam: any;
  public subscriber: any;

  public triggerPause = true;
  public triggerStart = true;
  public triggerWait = true;
  public triggerWaitStop = true;

  ngOnInit(): void { }

  public onStart() {
    if (this.triggerStart) {
      this.srteam = this.createObserver();
      this.subscriber = this.createSubscriber();
      this.triggerStart = false;
    }
  }

  public onPause() {
    if (this.triggerPause) {
      this.subscriber.unsubscribe();
      this.triggerPause = false;
    } else {
      this.srteam = this.createObserver();
      this.subscriber = this.createSubscriber();
      this.triggerPause = true;
    }
  }

  public onWait() {
    if (this.triggerWaitStop) {
      if (this.triggerWait) {
        this.triggerWait = false;
        setTimeout(() => {
          this.triggerWait = true;
        }, 300);
      } else {
        this.subscriber.unsubscribe();
        this.triggerWaitStop = false;
      }
    } else {
      this.srteam = this.createObserver();
      this.subscriber = this.createSubscriber();
      this.triggerWaitStop = true;
    }
  }

  public onReset() {
    this.subscriber.unsubscribe();
    this.seconds = 0;
    this.triggerStart = true;
    this.triggerPause = true;
    this.triggerWaitStop = true;
  }

  private createObserver() {
    const stream = Observable.create((observer) => {
      const interval = setInterval(() => {
        observer.next(this.seconds++);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    });

    return stream;
  }

  private createSubscriber() {
    const subscriber = this.srteam.subscribe(
      (value) => {

      },
      (err) => {
        console.log(err);
      },
      () => {

      }
    );

    return subscriber;
  }
}
