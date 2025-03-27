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
import { Category, CategoryCreate } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit, OnChanges {
  @Input() openModal: boolean = false;
  @Input() categoryToUpdate: Category | null = null;
  @ViewChild('createModal') createModal!: ElementRef;
  @Output() refreshList: EventEmitter<boolean> = new EventEmitter<boolean>();
  public categoryForm!: FormGroup;
  public isEdit: boolean = false;
  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ])});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['openModal']) {
      if (this.categoryToUpdate) {
        this.isEdit = true;
        this.categoryForm.patchValue({
          name: this.categoryToUpdate.name
        });
      }
      this.openCloseModal();
    }
  }

  createCategory(): void {
    if (!this.categoryForm.valid) {
      return;
    }
    let category: CategoryCreate = {
      ...this.categoryForm.value,
      roles: ['user'],
    };

    this.categoryService.createCategory(category).subscribe({
      next: (category: Category) => {
        console.log('Category created with id: ', category.id);
        this.openCloseModal();
        this.refreshList.emit(true);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateCategory(): void {
    if (!this.categoryForm.valid) {
      return;
    }
    let category: CategoryCreate = {
      ...this.categoryForm.value
    };

    this.categoryService.updateCategory(this.categoryToUpdate!.id, category).subscribe({
      next: (category: Category) => {
        console.log('Category updated with id: ', category.id);
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
    this.categoryForm.reset({
      name: ''
    });
    this.isEdit = false;
    this.categoryToUpdate = null;
  }
}


