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
    {
        path: 'sale_courses',
        loadComponent: () => import('./core/courses/dashbboard-register/dashbboard-register.component'),
    },
    {
        path: 'my_courses',
        loadComponent: () => import('./core/courses/list-my-courses/list-my-courses.component'),
    }
];
