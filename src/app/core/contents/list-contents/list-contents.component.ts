import { Component, inject, OnInit } from '@angular/core';
import { Content } from '../../../models/content';
import { ContentService } from '../../../services/content.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-contents',
  imports: [CreateComponent],
  templateUrl: './list-contents.component.html',
  styleUrl: './list-contents.component.scss'
})
export default class ListContentsComponent implements OnInit{
  public contents: Array<Content> = [];
  public openModal: boolean = false;
  public contentToUpdate: Content | null = null;
  private contentService = inject(ContentService);
  
  ngOnInit(): void {
    this.getAllContents();
  }


  getAllContents(): void {
    this.contentService.getAllContents().subscribe({
      next: (contents: Array<Content>) => {
        this.contents = contents;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  deleteContent(id: number): void {
    this.contentService.deleteContent(id).subscribe({
      next: () => {
        this.getAllContents();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  goToUpdateContent(content: Content): void {
    this.openModal = !this.openModal;
    this.contentToUpdate = content;
  }

}
