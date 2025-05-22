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

  downloadCertificate(enrollment: Enrollment): void {
    let data = {
      user_id: enrollment.user.id,
      course_id: enrollment.course.id
    }
    this.enrollmentService.downloadCertificate(data).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificate_${enrollment.course.title}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading certificate:', error);
      }
    });
  }

  
}
