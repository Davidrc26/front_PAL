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
import { User, UserCreate } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit, OnChanges {
  @Input() openModal: boolean = false;
  @Input() userToUpdate: User | null = null;
  @ViewChild('createModal') createModal!: ElementRef;
  @Output() refreshList: EventEmitter<boolean> = new EventEmitter<boolean>();
  public userForm!: FormGroup;
  public isEdit: boolean = false;
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['openModal']) {
      if (this.userToUpdate) {
        this.isEdit = true;
        this.userForm.patchValue({
          username: this.userToUpdate.username,
          password: '',
        });
      }
      this.openCloseModal();
    }
  }

  createUser(): void {
    if (!this.userForm.valid) {
      return;
    }
    let user: UserCreate = {
      ...this.userForm.value,
      roles: ['student'],
    };

    this.userService.createUser(user).subscribe({
      next: (user: User) => {
        console.log('User created with id: ', user.id);
        this.openCloseModal();
        this.refreshList.emit(true);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateUser(): void {
    if (!this.userForm.valid) {
      return;
    }
    let user: UserCreate = {
      ...this.userForm.value,
      roles: ['user'],
    };

    this.userService.updateUser(this.userToUpdate!.id, user).subscribe({
      next: (user: User) => {
        console.log('User updated with id: ', user.id);
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
    this.userForm.reset({
      username: '',
      password: '',
    });
    this.isEdit = false;
    this.userToUpdate = null;
  }
}
