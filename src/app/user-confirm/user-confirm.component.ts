import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../model/user';
import { UserDataService } from '../service/user-data.service';

@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.scss'],
})
export class UserConfirmComponent implements OnInit {
  //控制dialog是否关闭
  dialogClose: boolean;
  //操作关键词
  keyword: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User; action: any },
    private userService: UserDataService,
    private dialog: MatDialog
  ) {}

  //根据传入的data.action来设置操作关键词
  ngOnInit(): void {
    this.dialogClose = false;
    this.keyword = '登録';
    if (this.data.action === 'change') {
      this.keyword = '登録';
    } else if (this.data.action === 'delete') {
      this.keyword = '削除';
    }
  }

  //根据操作类型执行操作
  //结束后关闭所有对话框
  save() {
    switch (this.data.action) {
      case 'change':
        this.userService.updateUser(this.data.user);
        break;
      case 'delete':
        this.userService.deleteUser(this.data.user.Number);
        break;
      case 'add':
        this.userService.addUser(this.data.user);
        break;
    }
    this.dialog.closeAll();
  }

  //关闭当前对话框
  closeDialog() {
    this.dialogClose = true;
  }
}
