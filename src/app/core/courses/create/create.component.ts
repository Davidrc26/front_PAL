import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Course, CourseCreate } from '../../../models/course';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit, OnChanges {
  @Input() openModal: boolean = false;
  @Input() courseToUpdate: Course | null = null;
  @ViewChild('createModal') createModal!: ElementRef;
  @Output() refreshList: EventEmitter<boolean> = new EventEmitter<boolean>();
  public courseForm!: FormGroup;
  public isEdit: boolean = false;
  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.courseForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      instructor: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['openModal']) {
      if (this.courseToUpdate) {
        this.isEdit = true;
        this.courseForm.patchValue({
          title: this.courseToUpdate.title, 
          description: this.courseToUpdate.description,
          price: this.courseToUpdate.price,
          instructor: this.courseToUpdate.instructor,
          category: this.courseToUpdate.category
        });
      }
      this.openCloseModal();
    }
  }

  createCourse(): void {
    if (!this.courseForm.valid) {
      return;
    }
    let course: CourseCreate = {
      ...this.courseForm.value,
    };

    this.courseService.createCourse(course).subscribe({
      next: (course: Course) => {
        console.log('Course created with id: ', course.id);
        this.openCloseModal();
        this.refreshList.emit(true);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateCourse(): void {
    if (!this.courseForm.valid) {
      return;
    }
    let course: CourseCreate = {
      ...this.courseForm.value
    };

    this.courseService.updateCourse(this.courseToUpdate!.id, course).subscribe({
      next: (course: Course) => {
        console.log('Course updated with id: ', course.id);
        this.openCloseModal();
        this.refreshList.emit(true);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openCloseModal(): void {
    this.openModal = !this.openModal;
    this.createModal?.nativeElement.classList.toggle('hidden');
  }

  clearData(): void {
    this.courseForm.reset({
      title: '',
      description: '',
      price:'',
      instructor:'',
      category:''
    });
    this.isEdit = false;
    this.courseToUpdate = null;
  }
}


