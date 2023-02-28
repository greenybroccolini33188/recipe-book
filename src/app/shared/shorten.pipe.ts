import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  public transform(value: string, length: number = 10): string {
    return `${value.slice(0, length)}...`;
  }
}
