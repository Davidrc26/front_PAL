import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { Enrollment } from '../../../models/enrollment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-my-courses',
  imports: [DatePipe],
  templateUrl: './list-my-courses.component.html',
  styleUrl: './list-my-courses.component.scss'
})
export default class ListMyCoursesComponent implements OnInit {
  enrollments: Array<Enrollment> = [];
  private readonly enrollmentService = inject(EnrollmentService);

  ngOnInit(): void {
    this.getMyCourses();
  }

  getMyCourses(): void {
    this.enrollmentService.getMyCourses().subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
      },
      error: (error) => {
        console.error('Error fetching my courses:', error);
      }
    });
  }

  
}
