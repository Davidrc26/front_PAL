import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadComponent: () => import('./core/users/list-users/list-users.component'),
    },
    {
        path: 'categories',
        loadComponent: () => import('./core/category/list-category/list-category.component'),
    },
    {
        path: 'contents',
        loadComponent: () => import('./core/contents/list-contents/list-contents.component'),
    },
    {
        path: 'courses',
        loadComponent: () => import('./core/courses/list-courses/list-courses.component'),
    },
];
