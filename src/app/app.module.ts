import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UserConfirmComponent } from './user-confirm/user-confirm.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { CustomPaginator } from './custom-paginator';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [AppComponent, UserDialogComponent, UserConfirmComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDividerModule,
    NgxDatatableModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginator,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
