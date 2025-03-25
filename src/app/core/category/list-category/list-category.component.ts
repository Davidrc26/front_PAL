import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-categories',
  imports: [CreateComponent],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export default class ListCategoriesComponent implements OnInit{
  public categories: Array<Category> = [];
  public openModal: boolean = false;
  public categoryToUpdate: Category | null = null;
  private categoryService = inject(CategoryService);
  
  ngOnInit(): void {
    this.getAllCategories();
  }


  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Array<Category>) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.getAllCategories();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  goToUpdateCategory(category: Category): void {
    this.openModal = !this.openModal;
    this.categoryToUpdate = category;
  }

}
