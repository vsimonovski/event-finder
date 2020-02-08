import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule],
  exports: [MatToolbarModule, MatCardModule, MatInputModule, MatButtonModule],
  providers: []
})
export class AngularMaterialModule {}
