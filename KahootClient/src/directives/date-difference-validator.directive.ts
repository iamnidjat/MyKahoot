import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appDateDifferenceValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DateDifferenceValidatorDirective, multi: true }]
})
export class DateDifferenceValidatorDirective implements Validator {
  private _yearsToCompare: number = 16;

  @Input('appDateDifferenceValidator')
  set yearsToCompare(value: number | string) {
    // Convert the input value to a number or use a default value
    this._yearsToCompare = typeof value === 'string' ? parseInt(value, 10) || 16 : value;
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value) {
      const selectedDate: Date = new Date(control.value);
      const currentDate: Date = new Date();
      const differenceInYears: number = this.calculateDifferenceInYears(currentDate, selectedDate);

      if (differenceInYears < this.yearsToCompare) {
        return { 'dateDifferenceError': { value: differenceInYears } };
      }
    }

    return null;
  }

  private calculateDifferenceInYears(dateA: Date, dateB: Date): number {
    const millisecondsInYear: number = 1000 * 60 * 60 * 24 * 365.25;
    return Math.floor(Math.abs(dateA.getTime() - dateB.getTime()) / millisecondsInYear);
  }
}


