import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ConflictingNumberValidator,
  Gender,
  UserDataService,
} from '@training-app/backend';
import { ContentUserstableFacade } from '../+state/content-userstable.facade';
import { ContentUserstableEntity } from '../+state/content-userstable.models';
import { UserConfirmComponent } from '../user-confirm/user-confirm.component';

@Component({
  selector: 'training-app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { action: string; row: ContentUserstableEntity },
    private facade: ContentUserstableFacade
  ) {}

  //No.输入控件
  //自定义验证 Number不可重复
  //必须输入项
  numberControl: FormControl = new FormControl('', [
    Validators.required,
    ConflictingNumberValidator(this.facade.allContentUserstable$, this.data),
  ]);

  //姓名输入控件
  //必须输入项
  nameControl = new FormControl('', [Validators.required]);
  //姓名输入控件
  liveControl = new FormControl('');
  //选择的性别
  genderSelected: string = '';
  //对话框标题
  dialogTitle!: string;

  //根据action操作类型设置对话框标题
  //执行change操作时将数据填入输入框
  ngOnInit(): void {
    this.dialogTitle =
      this.data.action === 'add' ? '学生情報追加' : '学生情報変更';
    if (this.data.action == 'change') {
      this.numberControl.setValue(this.data.row.Number);
      this.nameControl.setValue(this.data.row.Name);
      this.genderSelected = this.data.row.Gender.toString();
      this.liveControl.setValue(this.data.row.Address);
    }
  }

  //获取姓名输入框错误提示信息
  nameGetErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return '不能为空，需输入对应值';
    }
    return '';
  }

  //获取No.输入框错误信息
  numberGetErrorMessage() {
    if (this.numberControl.hasError('required')) {
      return '不能为空，需输入对应值';
    } else {
      if (this.numberControl.hasError('name')) {
        return this.numberControl.getError('name');
      }
    }
  }

  //打开确认对话框 并传入用户信息
  openConfirm() {
    let user: ContentUserstableEntity = {
      Number: Number.parseInt(this.numberControl.value),
      Name: this.nameControl.value,
      Gender:
        +this.genderSelected === Gender.Male ? Gender.Male : Gender.FeMale,
      Address: this.liveControl.value,
    };

    this.dialog.open(UserConfirmComponent, {
      data: { user: user, action: this.data.action },
      disableClose: true,
    });
  }
}
