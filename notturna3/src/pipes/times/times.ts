import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TimesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'times',
})
export class TimesPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

  transform(value: number): any {
    const iterable = {};
    iterable[Symbol.iterator] = function* () {
      let n = 0;
      while (n < value) {
        yield ++n;
      }
    };
    return iterable;
  }
}
