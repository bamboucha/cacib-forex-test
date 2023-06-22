import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number, currencyCode: string, rate: number): string {
    const convertedValue = value * rate;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(convertedValue);
  }

}
