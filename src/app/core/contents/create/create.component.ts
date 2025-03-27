

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
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Content, ContentCreate } from '../../../models/content';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit, OnChanges {
  @Input() openModal: boolean = false;
  @Input() contentToUpdate: Content | null = null;
  @ViewChild('createModal') createModal!: ElementRef;
  @Output() refreshList: EventEmitter<boolean> = new EventEmitter<boolean>();
  public contentForm!: FormGroup;
  public isEdit: boolean = false;
  public selectedFile: File | null = null;
   // Para manejar el archivo seleccionado
  private contentService = inject(ContentService);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.contentForm = new FormGroup({
      file_url: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      type: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      course: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['openModal']) {
      if (this.contentToUpdate) {
        this.isEdit = true;
        this.contentForm.patchValue({
          file_url: this.contentToUpdate.file_url,
          type: this.contentToUpdate.type,
          course: this.contentToUpdate.course,
        });
      }
      this.openCloseModal();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.contentForm.patchValue({ file_url: input.files[0].name });
    }
  }

  createContent(): void {
    if (!this.contentForm.valid || !this.selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('file_url', this.selectedFile!); // Agrega el archivo
    formData.append('type', this.contentForm.get('type')?.value);
    formData.append('course', this.contentForm.get('course')?.value);

    this.contentService.createContent2(formData).subscribe({
      next: (content: Content) => {
        console.log('Content created with id: ', content.id);
        this.clearData();
        this.openCloseModal();
        this.refreshList.emit(true);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateContent(): void {
    if (!this.contentForm.valid || !this.selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('file_url', this.selectedFile!); // Agrega el archivo
    formData.append('type', this.contentForm.get('type')?.value);
    formData.append('course', this.contentForm.get('course')?.value);


    this.contentService.updateContent(this.contentToUpdate!.id, formData).subscribe({
      next: (content: Content) => {
        console.log('Content updated with id: ', content.id);
        this.clearData();
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
    this.contentForm.reset({
      file_url: '',
      type: '',
      course: '',
    });
    this.isEdit = false;
    this.contentToUpdate = null;
    this.selectedFile = null;
  }
}