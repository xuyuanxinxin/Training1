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
      LiveAddress: 'xxxx',
    },
    {
      Number: 1002,
      Name: '李四',
      Gender: Gender.FeMale,
      LiveAddress: 'xxxx',
    },
    {
      Number: 1003,
      Name: '王五',
      Gender: Gender.Male,
      LiveAddress: 'xxxx',
    },
  ];

  constructor() {}
  getUsers(): Observable<User[]> {
    return of(this.myDataArray);
  }

  addUser(user: User) {
    this.myDataArray.push(user);
  }

  updateUser(user: User) {
    console.log("update user:"+user.Gender);
    
    this.myDataArray = this.myDataArray.map((item) => {
      if (item.Number == user.Number) {
        return user;
      } else return item;
    });
  }

  deleteUser(user: User) {
    this.myDataArray.forEach((item) => {
      if (item.Number == user.Number)
        this.myDataArray.splice(this.myDataArray.indexOf(item), 1);
    });
    // console.log(this.myDataArray);
  }
}
