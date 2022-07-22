import { AfterViewInit, Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[matErrorMessages]',
  // selector: 'mat-error',
  template: '{{ error }}',
})
export class MatErrorMessagesComponent implements AfterViewInit {
  public error = '';
  private inputRef!: MatFormFieldControl<MatInput>;

  constructor(private _inj: Injector, private translateService: TranslateService) {}

  public ngAfterViewInit(): void {
    const container = this._inj.get(MatFormField);
    this.inputRef = container._control;

    // const  a = container._elementRef.nativeElement.querySelectorAll('input').forEach(
    //   elem =>  {
    //   fromEvent(elem.nativeElement, "blur").subscribe((event: FocusEvent) => console.log(1));
    // });

    fromEvent(container._elementRef.nativeElement.querySelector('input'), 'blur').subscribe((val) =>
      this.updateErrors()
    );

    this.inputRef?.ngControl?.statusChanges?.subscribe((val) => this.updateErrors());
  }

  private updateErrors() {
    const controlErrors = this.inputRef?.ngControl?.errors;

    if (controlErrors) {
      const firstError = Object.keys(controlErrors)[0];

      this.error =
        firstError === 'server' ? controlErrors[firstError] : this.translateService.instant('errors.' + firstError);
    }
  }
}
