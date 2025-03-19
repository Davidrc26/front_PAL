import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserCreate } from '../models/user';
import { environment } from '../../environments/environment.development';

const BASE_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private http: HttpClient
  ) {

  }

  public getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${BASE_URL}users/all`);
  }

  public createUser(body: UserCreate): Observable<User>{
    return this.http.post<User>(`${BASE_URL}users/create`, body);
  }

  public updateUser(id: number, body: UserCreate): Observable<User>{
    return this.http.put<User>(`${BASE_URL}users/update/${id}`, body);
  }

  public deleteUser(id: number): Observable<any>{
    return this.http.delete(`${BASE_URL}users/delete/${id}`);
  }

  public getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${BASE_URL}users/${id}`);
  }
}
