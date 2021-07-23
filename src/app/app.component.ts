import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserDataService } from './service/user-data.service';
import { User } from './model/user';
import { Observable, of } from 'rxjs';
import { UserConfirmComponent } from './user-confirm/user-confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Gender } from './model/gender';
import { ColumnMode } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Training1';
  flag = false;
  timeStart: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['number', 'name', 'gender', 'address'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  datas: Observable<User[]>;
  force = ColumnMode.force;
  rowselected = [];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(public dialog: MatDialog, private userService: UserDataService) {
    this.datas = this.userService.getUsers();
    this.userService.getUsers().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(action: string, rowData?: any) {
    if (!this.flag) {
      this.dialog
        .open(UserDialogComponent, {
          data: { action: action, row: rowData },
          disableClose: true,
        })
        .afterClosed()
        .subscribe(() => {
          this.userService.getUsers().subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.datas = this.userService.getUsers();
          });
          this.dataSource.paginator = this.paginator;
        });
    }
  }

  onMouseDown(event: Event) {
    console.log('mouse down');
    console.log(event);

    this.timeStart = this.getNow();
  }

  onMouseUp(row: any) {
    console.log(row);

    console.log('mouse up');
    if (this.getNow() - this.timeStart > 500) {
      this.dialog
        .open(UserConfirmComponent, {
          data: { action: 'delete', user: row },
          disableClose: true,
        })
        .afterClosed()
        .subscribe(() => {
          this.userService.getUsers().subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.datas = this.userService.getUsers();
          });
          this.dataSource.paginator = this.paginator;
          this.datas = this.userService.getUsers();
          this.flag = false;
        });
      this.datas = this.userService.getUsers();
      this.flag = true;
      console.log('mouse up actived');
    }
  }

  getNow() {
    let now = new Date();
    return now.getTime();
  }

  genderTransform(gender: Gender): string {
    return gender === 0 ? '男' : '女';
  }
}
