import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentUserstableEntity } from '@training-app/content/userstable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}
  API = 'http://localhost:3000/users';
  /**
   * 获取用户
   * @returns 用户的数据流
   */
  getUsers(): Observable<ContentUserstableEntity[]> {
    return this.http.get(`${this.API}`) as Observable<
      ContentUserstableEntity[]
    >;
  }

  /**
   * 添加用户
   * @param user 添加的用户对象
   */
  addUser(user: ContentUserstableEntity): Observable<ContentUserstableEntity> {
    // this.userArray.push(user);
    return this.http
      .post(`${this.API}`, user)
      .pipe(map((data) => data as ContentUserstableEntity));
  }

  /**
   * 更新用户信息
   * @param id 更新的用户对象的id
   * @param user 更新的用户对象
   */
  updateUser(
    id: number,
    user: ContentUserstableEntity
  ): Observable<ContentUserstableEntity> {
    return this.http
      .put(`${this.API}/${id}`, user)
      .pipe(map((data) => data as ContentUserstableEntity));
  }

  /**
   * 删除用户
   * @param userNumber 用户编号
   */
  deleteUser(userNumber: number): Observable<ContentUserstableEntity> {
    return this.http
      .delete(`${this.API}/${userNumber}`)
      .pipe(map((data) => data as ContentUserstableEntity));
  }
}
