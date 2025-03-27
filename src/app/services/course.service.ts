import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CourseCreate } from '../models/course';
import { environment } from '../../environments/environment.development';

const BASE_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  constructor(
    private http: HttpClient
  ) {

  }

  public getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(`${BASE_URL}courses/all`);
  }

  public createCourse(body: CourseCreate): Observable<Course>{
    return this.http.post<Course>(`${BASE_URL}courses/create`, body);
  }

  public updateCourse(id: number, body: CourseCreate): Observable<Course>{
    return this.http.put<Course>(`${BASE_URL}courses/update/${id}`, body);
  }

  public deleteCourse(id: number): Observable<any>{
    return this.http.delete(`${BASE_URL}courses/delete/${id}`);
  }

  public getCourseById(id: number): Observable<Course>{
    return this.http.get<Course>(`${BASE_URL}courses/${id}`);
  }
}
