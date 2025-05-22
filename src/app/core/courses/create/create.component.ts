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
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

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
  private categoryService = inject(CategoryService);
  private userService = inject(UserService);
  public categories: Array<Category> = [];
  public instructors: Array<User> = [];
  public difficulties: Array<string> = [
    'Basic',
    'Intermediate',
    'Advanced',
  ];


  ngOnInit(): void {
    this.buildForm();
    this.getCategories();
    this.getInstructors();
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
        Validators.minLength(1),
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      difficulty: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }


  getCategories(){
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Array<Category>) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getInstructors(){
    this.userService.getAllUsers().subscribe({
      next: (instructors: Array<User>) => {
        this.instructors = instructors.filter((user) => user.roles.some((role) => role.name === 'instructor'));
      },
      error: (error) => {
        console.error(error);
      },
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
          instructor: this.courseToUpdate.instructor.id,
          category: this.courseToUpdate.category.id,
          difficulty: this.courseToUpdate.difficulty,
        });
      }
      this.openCloseModal();
    }
  }

  createCourse(): void {
    console.log(this.courseForm.value);
    if (!this.courseForm.valid) {
      console.log('Invalid form');
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


