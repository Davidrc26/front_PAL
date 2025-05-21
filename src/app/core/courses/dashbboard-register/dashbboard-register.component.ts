import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course.service';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashbboard-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './dashbboard-register.component.html',
  styleUrl: './dashbboard-register.component.scss',
})
export default class DashbboardRegisterComponent implements OnInit {
  courses: Course[] = [];
  paymentForm!: FormGroup;
  currentCourse: Course | null = null;

  constructor(private courseService: CourseService) {}
  ngOnInit(): void {
    this.getCourses();
    this.buildForm();
  }

  buildForm(): void {
    this.paymentForm = new FormGroup({
      amount: new FormControl(0),
    });
  }

  getCourses(): void {
    // Cambiar por el endpoitn de juanda
    this.courseService.getAllCourses().subscribe({
      next: (response) => {
        this.courses = response;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
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

  openCloseModal() {}

  clearData() {
    this.currentCourse = null;
    this.paymentForm.reset({
      amount: 0,
    });
  }

  pay() {

  }

  enroll() {
    //hacer el enrol
    this.clearData();
  }
}
