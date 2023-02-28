import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  public transform(value: string, limit: number = 10): string {
    if (value.length > 10) return `${value.slice(0, limit)} ...`;
    return value;
  }
}
