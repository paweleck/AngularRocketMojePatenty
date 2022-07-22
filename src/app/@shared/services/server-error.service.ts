import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServerErrorService {
  constructor() {}

  handleErrors(data: any, form: any): boolean {
    Object.keys(form.controls).forEach((key) => {
      form.get(key).setErrors(null);
    });

    if (data && data.violations && form) {
      for (const violationObj of data.violations) {
        const formControl = form.get(violationObj.field);
        if (formControl) {
          formControl.setErrors({ server: violationObj.message });
        } else {
          // todo obsluga bledow ktore nie pasuja do formularza / globalnych
        }
        formControl.markAsTouched();
      }

      setTimeout(() => {
        const firstElem = document.getElementsByClassName('mat-form-field-invalid')[0];
        if (firstElem) {
          window.scroll({
            top: firstElem.getBoundingClientRect().top + window.scrollY - 50,
            left: 0,
            behavior: 'smooth',
          });
        }
      });

      return false;
    }

    return true;
  }
}
