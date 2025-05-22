import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course.service';
import {
  Form,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QueryParams } from '../../../models/query-params';
import { CreatePayment } from '../../../models/payment';
import { PaymentService } from '../../../services/payment.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { EnrollmentCreate } from '../../../models/enrollment';

@Component({
  selector: 'app-dashbboard-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './dashbboard-register.component.html',
  styleUrl: './dashbboard-register.component.scss',
})
export default class DashbboardRegisterComponent implements OnInit {
  @ViewChild('paymentModal') paymentModal!: ElementRef;
  courses: Course[] = [];
  paymentForm!: FormGroup;
  currentCourse: Course | null = null;
  searchForm!: FormGroup;
  private readonly courseService = inject(CourseService);
  private readonly paymentService = inject(PaymentService);
  private readonly enrollmentService = inject(EnrollmentService);

  ngOnInit(): void {
    this.getCourses();
    this.buildForms();
  }

  buildForms(): void {
    this.paymentForm = new FormGroup({
      amount: new FormControl(0, [Validators.required]),
    });

    this.searchForm = new FormGroup({
      query: new FormControl(null),
      free: new FormControl(null),
      orderBy: new FormControl(null),
      dificulty: new FormControl(null),
      minRating: new FormControl(null),
    });
  }

  getCourses(): void {
    // Cambiar por el endpoint de juanda
    this.courseService.getAllCourses().subscribe({
      next: (response) => {
        this.courses = response;
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }

  searchCourses(): void {
    if(this.searchForm.invalid) {
      alert('The search term is required');
      return;
    }
    const query = this.searchForm.get('query')?.value;
    const queryParams: QueryParams = {
      free: this.searchForm.get('free')?.value,
      dificulty: this.searchForm.get('dificulty')?.value,
      minRating: this.searchForm.get('minRating')?.value,
      orderBy: this.searchForm.get('orderBy')?.value,
    };
    this.courseService.searchCourses(query, queryParams).subscribe({
      next: (response) => {
        this.courses = response;
      },
      error: (error) => {
         alert(error.error.message);
      },
    });
  }

  goToPay(course: Course): void {
    this.currentCourse = course;

    if (course.price > 0) {
      this.paymentForm.patchValue({
        amount: course.price,
      });
      this.openCloseModal();
    } else {
      this.enroll();
    }
  }

  openCloseModal() {
    this.paymentModal?.nativeElement.classList.toggle('hidden');
  }

  clearData() {
    this.currentCourse = null;
    this.paymentForm.reset({
      amount: 0,
    });
  }

  pay() {
    if (this.paymentForm.invalid) {
      alert('The amount is required');
      return;
    }
    if (this.currentCourse === null) {
      alert('No course selected');
      return;
    }
    const body: CreatePayment = {
      user: 1,
      course: this.currentCourse.id,
      amount: this.paymentForm.get('amount')?.value,
    }

    this.paymentService.createPayment(body).subscribe({
      next: (response) => {
        alert('Payment successful');
        this.enroll();
      },
      error: (error) => {
        console.error('Error processing payment:', error);
        alert(error.error.message);
      },
    });
    
  }

  enroll() {
    
    if (this.currentCourse === null) {
      alert('No course selected');
      return;
    }
    const body: EnrollmentCreate = {
      user: 1,
      course: this.currentCourse.id,
    };

    this.enrollmentService.createEnrollment(body).subscribe({
      next: (response) => {
        console.log('Enrollment successful:', response);
        alert('Enrollment successful');
        this.clearData();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error processing enrollment:', error);
        alert(error.error.message);
        this.clearData();
        this.closeModal();
      },
    });
  }

  closeModal() {
    this.paymentModal?.nativeElement.classList.add('hidden');
    this.clearData();
  }
}
