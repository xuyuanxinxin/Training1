import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../model/user';

export function ConflictingNumberValidator(
  usersObserval: Observable<User[]>,
  data: any
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let length: number = 0;
    if (data.action == 'change') {
      usersObserval.subscribe((users) => {
        length = users.filter((user) => {
          if (user.Number != data.row.Number && user.Number == control.value){
            return user;
          }
          return null; 
        }).length;
      });
    } else {
      usersObserval.subscribe((users) => {
        length = users.filter((user) => user.Number == control.value).length;
      });
    }
    if (length == 0) {
      return null;
    } else {
      return { name: '重复的No.' };
    }
  };
}
