import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment, EnrollmentCreate } from '../models/enrollment';
import { environment } from '../../environments/environment.development';

const BASE_URL = environment.apiUrl + 'enrollments';
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(
    private http: HttpClient,
  ) { }

  createEnrollment(body: EnrollmentCreate) : Observable<Enrollment>{
    return this.http.post<Enrollment>(`${BASE_URL}/register`, body);
  }

  getMyCourses(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${BASE_URL}/my-courses/${1}`);
  }

  downloadCertificate(data: { user_id: number, course_id: number }): Observable<Blob> {
    return this.http.post(`${environment.apiUrl}certificates/generate?courseId=${data.course_id}&userId=${data.user_id}`, {}, { responseType: 'blob' });
  }
}
