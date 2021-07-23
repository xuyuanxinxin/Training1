import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserConfirmComponent } from '../user-confirm/user-confirm.component';
import { User } from '../model/user';
import { UserDataService } from '../service/user-data.service';
import { ConflictingNumberValidator } from '../directive/conflicting-number.directive';
import { Gender } from '../model/gender';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { action: string; row: User },
    private userService: UserDataService
  ) {}

  numberControl: FormControl = new FormControl('', [
    Validators.required,
    ConflictingNumberValidator(this.userService.getUsers(), this.data),
  ]);
  nameControl = new FormControl('', [Validators.required]);
  liveControl = new FormControl('');
  selected: string = '';
  dialogTitle: string;

  ngOnInit(): void {
    this.dialogTitle =
      this.data.action === 'add' ? '学生情報追加' : '学生情報変更';
    if (this.data.action == 'change') {
      this.numberControl.setValue(this.data.row.Number);
      this.nameControl.setValue(this.data.row.Name);
      this.selected = this.data.row.Gender.toString();
      this.liveControl.setValue(this.data.row.Address);
    }
  }

  getErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return '不能为空，需输入对应值';
    }
    return '';
  }

  numberGetErrorMessage() {
    if (this.numberControl.hasError('required')) {
      return '不能为空，需输入对应值';
    } else {
      if (this.numberControl.hasError('name')) {
        return this.numberControl.getError('name');
      }
    }
  }

  openConfirm() {
    let user: User = {
      Number: Number.parseInt(this.numberControl.value),
      Name: this.nameControl.value,
      Gender: +this.selected === Gender.Male ? Gender.Male : Gender.FeMale,
      Address: this.liveControl.value,
    };

    this.dialog.open(UserConfirmComponent, {
      data: { user: user, action: this.data.action },
      disableClose: true,
    });
  }
}
