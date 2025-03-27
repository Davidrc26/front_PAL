import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content, ContentCreate } from '../models/content';
import { environment } from '../../environments/environment.development';

const BASE_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  
  constructor(
    private http: HttpClient
  ) {

  }

  public getAllContents(): Observable<Content[]>{
    return this.http.get<Content[]>(`${BASE_URL}contents/all`);
  }

  public createContent(body: ContentCreate): Observable<Content>{
    return this.http.post<Content>(`${BASE_URL}contents/create`, body);
  }

  public createContent2(contentData: FormData): Observable<Content> {
    return this.http.post<Content>(`${BASE_URL}/contents/create`, contentData);
  }

  public updateContent(id: number, body: ContentCreate): Observable<Content>{
    return this.http.put<Content>(`${BASE_URL}contents/update/${id}`, body);
  }

  public deleteContent(id: number): Observable<any>{
    return this.http.delete(`${BASE_URL}contents/delete/${id}`);
  }

  public getContentById(id: number): Observable<Content>{
    return this.http.get<Content>(`${BASE_URL}contents/${id}`);
  }
}
