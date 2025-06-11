import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conditionalTruncate',
  standalone: true
})
export class ConditionalTruncatePipe implements PipeTransform {

  // if event overlapped, cut the string and add dots
  transform(value: string, overlap: boolean = false, length: number = 5): string {
    if (!value) return '';
    
    return overlap && value.length > length
      ? value.slice(0, length) + '...'
      : value;
  }

}
