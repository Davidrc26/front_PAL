import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CategoryCreate } from '../models/category';
import { environment } from '../../environments/environment.development';

const BASE_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(
    private http: HttpClient
  ) {

  }

  public getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${BASE_URL}categories/all`);
  }

  public createCategory(body: CategoryCreate): Observable<Category>{
    return this.http.post<Category>(`${BASE_URL}categories/create`, body);
  }

  public updateUser(id: number, body: CategoryCreate): Observable<Category>{
    return this.http.put<Category>(`${BASE_URL}categories/update/${id}`, body);
  }

  public deleteCategory(id: number): Observable<any>{
    return this.http.delete(`${BASE_URL}categories/delete/${id}`);
  }

  public getCategoryById(id: number): Observable<Category>{
    return this.http.get<Category>(`${BASE_URL}categories/${id}`);
  }
}
