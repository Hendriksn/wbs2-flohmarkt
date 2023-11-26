import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformater'
})
export class DateformaterPipe implements PipeTransform {

  transform(value: Date, args?: any): string {
    return value.toLocaleDateString('de-DE');
  }

}
