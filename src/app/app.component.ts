import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserDataService } from './service/user-data.service';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { UserConfirmComponent } from './user-confirm/user-confirm.component';
import { Gender } from './model/gender';
import { ColumnMode } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //网页标题
  title = 'Training1';
  //判断是否打开用户信息填写对话框
  userDialogOpen = false;
  //长按的开始时间
  startTime: number;

  //表格的数据源
  datas: Observable<User[]>;
  //设置表格列按比例分配
  force = ColumnMode.force;
  //每页数据行数
  pageSize = 3;

  constructor(public dialog: MatDialog, private userService: UserDataService) {}

  /**
   * 初始化表格数据
   */
  ngOnInit() {
    this.datas = this.userService.getUsers();
  }

  /**
   * 打开用户信息填写对话框
   * @param action 操作类型
   * @param rowData 选择的行的用户数据
   */
  openDialog(action: string, rowData?: any) {
    if (!this.userDialogOpen) {
      this.dialog
        .open(UserDialogComponent, {
          data: { action: action, row: rowData },
          disableClose: true,
        })
        .afterClosed()
        .subscribe(() => {
          this.userService.getUsers().subscribe((data) => {
            this.datas = this.userService.getUsers();
          });
        });
    }
  }

  /**
   * 处理鼠标按下事件
   * 设置startTime
   * @param event 鼠标事件
   */
  onMouseDown(event: Event) {
    this.startTime = this.getNow();
  }

  /**
   * 处理鼠标抬起事件
   * 根据startTime判断是否为长按
   * 长按弹出确认删除对话框
   * @param row 选中的行数据
   */
  onMouseUp(row: User) {
    if (this.getNow() - this.startTime > 500) {
      this.dialog
        .open(UserConfirmComponent, {
          data: { action: 'delete', user: row },
          disableClose: true,
        })
        .afterClosed()
        .subscribe(() => {
          this.datas = this.userService.getUsers();
          this.userDialogOpen = false;
        });
      this.datas = this.userService.getUsers();
      this.userDialogOpen = true;
    }
  }

  /**
   * 获取当前时间
   * @returns 当前时间
   */
  getNow() {
    let now = new Date();
    return now.getTime();
  }

  /**
   * 性别变量转换成常量
   * @param gender 需转换的性别变量
   * @returns 性别的常量字符串
   */
  genderTransform(gender: Gender): string {
    return gender === 0 ? '男' : '女';
  }
}
