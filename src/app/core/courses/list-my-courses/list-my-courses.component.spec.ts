import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyCoursesComponent } from './list-my-courses.component';

describe('ListMyCoursesComponent', () => {
  let component: ListMyCoursesComponent;
  let fixture: ComponentFixture<ListMyCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMyCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
