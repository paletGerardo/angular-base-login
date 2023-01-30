import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormatPipe } from './NumberFormat.pipe';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {
  transform(price: string, ...args: any[]): any {
    const priceInt = parseInt(price, 10);
    return new NumberFormatPipe().transform(priceInt, ...args);
  }
}