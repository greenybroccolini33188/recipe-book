import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify',
})
export class SlugifyPipe implements PipeTransform {
  /**
   * Turns string into url-friendly format
   * @param value
   * @param separator character used to join words in string together. Default: `"-"`
   */
  public transform(value: string, separator: string = '-'): string {
    const badCharRegExp: RegExp = /[_\-()\[\]\s]+/g;
    return value.replace(badCharRegExp, separator);
  }
}
