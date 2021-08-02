import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromContentUserstable from './+state/content-userstable.reducer';
import { ContentUserstableEffects } from './+state/content-userstable.effects';
import { ContentUserstableFacade } from './+state/content-userstable.facade';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserConfirmComponent } from './user-confirm/user-confirm.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { DataPersistence } from '@nrwl/angular';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [FormComponent, UserDialogComponent, UserConfirmComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    StoreModule.forFeature(
      fromContentUserstable.CONTENT_USERSTABLE_FEATURE_KEY,
      fromContentUserstable.reducer
    ),
    EffectsModule.forFeature([ContentUserstableEffects]),
    NgxDatatableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [ContentUserstableFacade, DataPersistence],
  exports: [FormComponent],
})
export class ContentUserstableModule {}
