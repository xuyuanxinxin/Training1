import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../model/user';

export function ConflictingNumberValidator(
  users: Observable<User[]>,
  data: any
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    let length: number = 0;
    if (data.action == 'change')
      users.subscribe((val)=>{
          length = val.filter((item) => {
            if (item.Number != data.row.Number && item.Number == control.value)
              return item;
            return '';
          }).length;
        }
      );
    else
      users.subscribe((val)=>{
          length = val.filter((item) => item.Number == control.value).length;
        }
      );

    if (length == 0) return null;
    else {
      return { name: '重复的No.' };
    }
  };
}
