import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, filter, interval, map, mergeMap, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'forex-converter';

  defaultConversionRate = 1.1;
  initialValue = 1000;
  convertedByForm: number = 0;
  conversionForm: FormGroup;
  valRate$: Observable<number> = of(0);
  euro: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.conversionForm = this.formBuilder.group({
      formVal: [''],
      fixedRate: ''
    });
  }

  ngOnInit(): void {
    this.everyThreeSeconds$(this.initialValue);
    this.changeRateEveryThree$();
  }

  public onSwitch() {
    const formVal = this.conversionForm.value.formVal;
    this.euro = !this.euro;
    formVal ? formVal * this.defaultConversionRate : formVal / this.defaultConversionRate;
  }


  public onSubmit() {
    const formVal = this.conversionForm.value.formVal;
    const formFixedRate = this.conversionForm.value.fixedRate;
    if (!this.euro) {
      this.convertedByForm = formFixedRate ? formVal * formFixedRate : formVal * this.defaultConversionRate
    }
    else { this.convertedByForm = formFixedRate ? formVal / formFixedRate : formVal / this.defaultConversionRate }


  }

  private everyThreeSeconds$(toConvert: number) {
    return this.changeRateEveryThree$().pipe(
      map((varRate) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(toConvert * varRate))
    )
  }

  private changeRateEveryThree$() {
    return this.valRate$ = interval(3000).pipe(
      filter(val => val !== null),
      map(() => this.getRandomNumber(-0.05, 0.05))
    )
  }

  private getRandomNumber(min: number, max: number): number {
    const random = Math.random();
    const scaledRandom = this.defaultConversionRate + (random * (max - min)) + min;
    return scaledRandom;
  }

}
