import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-courses',
  imports: [CreateComponent],
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.scss'
})
export default class ListCoursesComponent implements OnInit{
  public courses: Array<Course> = [];
  public openModal: boolean = false;
  public courseToUpdate: Course | null = null;
  private courseService = inject(CourseService);
  
  ngOnInit(): void {
    this.getAllCourses();
  }


  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (courses: Array<Course>) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.getAllCourses();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  goToUpdateCourse(course: Course): void {
    this.openModal = !this.openModal;
    this.courseToUpdate = course;
  }

}
