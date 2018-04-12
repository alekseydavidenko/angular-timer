import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TimerPipe'
})
export class TimerPipe implements PipeTransform {
  transform(item: any): any {
    let seconds: any;
    let minutes: any;
    let hours: any;

    hours = Math.floor(item  / 3600) % 24;
    item -= hours * 3600;

    minutes = Math.floor(item  / 60) % 60;
    item -= minutes * 60;

    seconds = item % 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return `${hours}:${minutes}:${seconds}`;
  }
}
