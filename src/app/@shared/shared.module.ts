import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { MatErrorMessagesComponent } from '@shared/components/mat-error-messages.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, TranslateModule, CommonModule],
  declarations: [LoaderComponent, MatErrorMessagesComponent],
  exports: [LoaderComponent, MatErrorMessagesComponent],
})
export class SharedModule {}
