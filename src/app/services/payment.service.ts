import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CreatePayment } from '../models/payment';
const BASE_URL = environment.apiUrl+'payments';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient,
  ) { }

  createPayment(body: CreatePayment) {
    return this.http.post(`${BASE_URL}/create`, body);
  }
  
}
