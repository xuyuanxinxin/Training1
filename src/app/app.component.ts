import {
  AfterViewInit,
  Component,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserDataService } from './service/user-data.service';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { UserConfirmComponent } from './user-confirm/user-confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor(public dialog: MatDialog, private userService: UserDataService) {
    this.userService
      .getUsers()
      .subscribe((data) => (this.dataSource = new MatTableDataSource(data)));
  }

  title = 'Training1';
  flag = false;
  timeInetrval: any;
  timeStart: any;
  pageSizeOptions: number[] = [2, 10, 25, 100];
  displayedColumns: string[] = ['number', 'name', 'gender', 'address'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  // dataSource: Observable<User[]> = this.userService.getUsers();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  openDialog(action: string, rowData: any) {
    if (!this.flag) {
      this.dialog
        .open(UserDialogComponent, {
          data: { action: action, row: rowData },
          disableClose: true,
        })
        .afterClosed()
        .subscribe(() => {
          this.userService
            .getUsers()
            .subscribe(
              (data) => (this.dataSource = new MatTableDataSource(data))
            );
          this.dataSource.paginator = this.paginator;
        });
    }
  }

  onMouseDown(event: MouseEvent, row: any) {
    this.timeStart = this.getNow();
    console.log('row::' + row.Number);
    console.log('row::' + row.Name);

    this.timeInetrval = setInterval(() => {
      if (this.getNow() - this.timeStart > 1000) {
        console.log('触发长按');
        console.log('target: ' + event.target);

        this.dialog
          .open(UserConfirmComponent, {
            data: { action: 'delete', user: row },
            disableClose: true,
          })
          .afterClosed()
          .subscribe(() => {
            this.userService
              .getUsers()
              .subscribe(
                (data) => (this.dataSource = new MatTableDataSource(data))
              );
            this.dataSource.paginator = this.paginator;
            this.flag = false;
          });
        clearInterval(this.timeInetrval);
      }
      this.flag = true;
    }, 100);
    console.log('mouse down:' + event.type);
  }

  onMouseUp(event: MouseEvent) {
    clearInterval(this.timeInetrval);
  }

  getNow() {
    let now = new Date();
    return now.getTime();
  }
}
