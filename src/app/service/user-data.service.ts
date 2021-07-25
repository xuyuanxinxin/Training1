import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Gender } from '../model/gender';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  myDataArray: User[] = [
    {
      Number: 1001,
      Name: '张三',
      Gender: Gender.Male,
      Address: 'xxxx',
    },
    {
      Number: 1002,
      Name: '李四',
      Gender: Gender.FeMale,
      Address: 'xxxx',
    },
    {
      Number: 1003,
      Name: '王五',
      Gender: Gender.Male,
      Address: 'xxxx',
    },
    {
      Number: 1004,
      Name: '王五2',
      Gender: Gender.FeMale,
      Address: 'xxxx',
    },
    {
      Number: 1005,
      Name: '王五3',
      Gender: Gender.Male,
      Address: 'xxxx',
    },
    {
      Number: 1006,
      Name: '王五4',
      Gender: Gender.FeMale,
      Address: 'xxxx',
    },
  ];

  constructor() {}

  getUsers(): Observable<User[]> {
    this.myDataArray = [...this.myDataArray];
    return of(this.myDataArray);
  }

  addUser(user: User) {
    this.myDataArray.push(user);
  }

  updateUser(user: User) {
    console.log('update user:' + user.Gender + ' ' + user.Address);
    this.myDataArray = this.myDataArray.map((item) => {
      if (item.Number == user.Number) {
        return user;
      } else {
        return item;
      }
    });
  }

  deleteUser(user: User) {
    console.log(user.Name);
    console.log(user.Number);

    this.myDataArray.forEach((item) => {
      if (item.Number == user.Number) {
        this.myDataArray.splice(this.myDataArray.indexOf(item), 1);
      }
    });
  }
}
