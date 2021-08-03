import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '@training-app/backend';
import { ContentUserstableFacade } from '../+state/content-userstable.facade';
import { ContentUserstableEntity } from '../+state/content-userstable.models';
import { addUser } from '@training-app/content/userstable';
import { deleteUser, updateUser } from '../+state/content-userstable.actions';

@Component({
  selector: 'training-app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.scss'],
})
export class UserConfirmComponent implements OnInit {
  //控制dialog是否关闭
  dialogClose!: boolean;
  //操作关键词
  keyword!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { user: ContentUserstableEntity; action: any },
    private dialog: MatDialog,
    private facade: ContentUserstableFacade
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
        this.facade.dispatch(
          updateUser({ id: this.data.user.Number, user: this.data.user })
        );
        break;
      case 'delete':
        this.facade.dispatch(deleteUser({ id: this.data.user.Number }));
        break;
      case 'add':
        this.facade.dispatch(addUser({ user: this.data.user }));
        break;
    }
    this.dialog.closeAll();
  }

  //关闭当前对话框
  closeDialog() {
    this.dialogClose = true;
  }
}
