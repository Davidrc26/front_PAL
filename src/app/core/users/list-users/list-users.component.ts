import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-users',
  imports: [CreateComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export default class ListUsersComponent implements OnInit{
  public users: Array<User> = [];
  public openModal: boolean = false;
  public userToUpdate: User | null = null;
  private userService = inject(UserService);
  
  ngOnInit(): void {
    this.getAllUsers();
  }


  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: Array<User>) => {
        this.users = users;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.getAllUsers();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  goToUpdateUser(user: User): void {
    this.openModal = !this.openModal;
    this.userToUpdate = user;
  }

}
