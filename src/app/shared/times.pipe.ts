import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times',
})
export class TimesPipe implements PipeTransform {
  public transform(value: number): any {
    const iterable: Iterable<any> = <Iterable<any>>{};
    iterable[Symbol.iterator] = function* (): Generator<number, void> {
      let n: number = 0;
      while (n < value) {
        yield ++n;
      }
    };
    return iterable;
  }
}

// https://stackoverflow.com/questions/36535629/repeat-html-element-multiple-times-using-ngfor-based-on-a-number/46034728#46034728
