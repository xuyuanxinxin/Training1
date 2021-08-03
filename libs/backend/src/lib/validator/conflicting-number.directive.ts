import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContentUserstableEntity } from '@training-app/content/userstable';

export function ConflictingNumberValidator(
  usersObserval: Observable<ContentUserstableEntity[]>,
  data: any
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    //符合条件的用户列表的长度
    let userArrayLength: number = 0;

    //当操作类型为change时检查
    //用户不能重复但可以和原来编号相同
    if (data.action == 'change') {
      usersObserval.subscribe((users) => {
        userArrayLength = users.filter((user) => {
          if (user.Number != data.row.Number && user.Number === control.value) {
            return user;
          }
          return null;
        }).length;
      });
    } else {
      //其他类型操作则不可重复
      usersObserval.subscribe((users) => {
        userArrayLength = users.filter(
          (user) => user.Number === control.value
        ).length;
      });
    }
    //符合条件列表为空则没有报错
    //否则则有错误信息返回
    if (userArrayLength === 0) {
      return null;
    } else {
      return { name: '重复的No.' };
    }
  };
}
