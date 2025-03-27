// import {
//   Component,
//   ElementRef,
//   EventEmitter,
//   inject,
//   Input,
//   OnChanges,
//   OnInit,
//   Output,
//   SimpleChanges,
//   ViewChild,
// } from '@angular/core';
// import {
//   FormControl,
//   FormBuilder,
//   FormGroup,
//   FormsModule,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { Content, ContentCreate } from '../../../models/content';
// import { ContentService } from '../../../services/content.service';

// @Component({
//   selector: 'app-create',
//   imports: [FormsModule, ReactiveFormsModule],
//   templateUrl: './create.component.html',
//   styleUrl: './create.component.scss',
// })
// export class CreateComponent implements OnInit, OnChanges {
//   @Input() openModal: boolean = false;
//   @Input() contentToUpdate: Content | null = null;
//   @ViewChild('createModal') createModal!: ElementRef;
//   @Output() refreshList: EventEmitter<boolean> = new EventEmitter<boolean>();
//   public contentForm!: FormGroup;
//   public isEdit: boolean = false;
//   private contentService = inject(ContentService);

//   ngOnInit(): void {
//     this.buildForm();
//   }

//   buildForm(): void {
//     this.contentForm = new FormGroup({
//       file_url: new FormControl('', [
//         Validators.required,
//         Validators.minLength(4),
//       ]),
//       type: new FormControl('', [
//         Validators.required,
//         Validators.minLength(8),
//       ]),
//       course: new FormControl('', [
//         Validators.required,
//         Validators.minLength(8),
//       ]),
//     });
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['openModal']) {
//       if (this.contentToUpdate) {
//         this.isEdit = true;
//         this.contentForm.patchValue({
//           file_url: this.contentToUpdate.file_url,
//           type: this.contentToUpdate.type,
//           course: this.contentToUpdate.course,
//         });
//       }
//       this.openCloseModal();
//     }
//   }

//   createContent(): void {
//     if (!this.contentForm.valid) {
//       return;
//     }
//     let content: ContentCreate = {
//       ...this.contentForm.value,
//     };

//     this.contentService.createContent(content).subscribe({
//       next: (content: Content) => {
//         console.log('Content created with id: ', content.id);
//         this.openCloseModal();
//         this.refreshList.emit(true);
//       },
//       error: (error) => {
//         console.error(error);
//       },
//     });
//   }

//   updateContent(): void {
//     if (!this.contentForm.valid) {
//       return;
//     }
//     let user: ContentCreate = {
//       ...this.contentForm.value,
//     };

//     this.contentService.updateUser(this.contentToUpdate!.id, user).subscribe({
//       next: (content: Content) => {
//         console.log('Content updated with id: ', content.id);
//         this.openCloseModal();
//         this.refreshList.emit(true);
//       },
//       error: (error) => {
//         console.error(error);
//       },
//     });
//   }

//   openCloseModal(): void {
//     this.openModal = !this.openModal;
//     this.createModal?.nativeElement.classList.toggle('hidden');
//   }

//   clearData(): void {
//     this.contentForm.reset({
//       file_url: '',
//       type: '',
//       course: '',
//     });
//     this.isEdit = false;
//     this.contentToUpdate = null;
//   }
// }


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
  public selectedFileName: string | null = null; // Para manejar el archivo seleccionado
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
        Validators.minLength(8),
      ]),
      course: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
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
      const file = input.files[0];
      this.selectedFileName = file.name;

      // Si necesitas almacenar el archivo en el formulario:
      this.contentForm.patchValue({ file_url: file.name });
    }
  }

  createContent(): void {
    if (!this.contentForm.valid) {
      return;
    }
    let content: ContentCreate = {
      ...this.contentForm.value,
    };

    this.contentService.createContent(content).subscribe({
      next: (content: Content) => {
        console.log('Content created with id: ', content.id);
        this.openCloseModal();
        this.refreshList.emit(true);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateContent(): void {
    if (!this.contentForm.valid) {
      return;
    }
    let user: ContentCreate = {
      ...this.contentForm.value,
    };

    this.contentService.updateContent(this.contentToUpdate!.id, user).subscribe({
      next: (content: Content) => {
        console.log('Content updated with id: ', content.id);
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
    this.selectedFileName = null; // Limpia el archivo seleccionado
  }
}