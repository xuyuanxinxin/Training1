import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Gender } from '../model/gender';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}

  userArray: User[] = [
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

  /**
   * 获取用户
   * @returns 用户的数据流
   */
  getUsers(): Observable<User[]> {
    this.userArray = [...this.userArray];
    return of(this.userArray);
  }

  /**
   * 添加用户
   * @param user 添加的用户对象
   */
  addUser(user: User) {
    this.userArray.push(user);
  }

  /**
   * 更新用户信息
   * @param user 更新的用户对象
   */
  updateUser(user: User) {
    this.userArray = this.userArray.map((item) => {
      if (item.Number == user.Number) {
        return user;
      } else {
        return item;
      }
    });
  }

  /**
   * 删除用户
   * @param userNumber 用户编号
   */
  deleteUser(userNumber: number) {
    this.userArray.forEach((item) => {
      if (item.Number == userNumber) {
        this.userArray.splice(this.userArray.indexOf(item), 1);
      }
    });
  }
}
