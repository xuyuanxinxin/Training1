import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../model/user';
import { UserDataService } from '../service/user-data.service';

@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.scss'],
})
export class UserConfirmComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User; action: any },
    private userService: UserDataService,
    private dialog: MatDialog
  ) {}
  close: boolean = false;
  keyword: string = '登録';

  ngOnInit(): void {
    if (this.data.action == 'change') {
      this.keyword = '登録';
    } else if (this.data.action == 'delete') {
      this.keyword = '削除';
    }
  }

  confirm() {
    switch(this.data.action){
      case 'change':this.userService.updateUser(this.data.user);break;
      case 'delete':this.userService.deleteUser(this.data.user);break;
      case 'add':this.userService.addUser(this.data.user);break;
    }
    this.close = true;
    this.dialog.closeAll();
  }
  cancel() {
    this.close = true;
  }
}
