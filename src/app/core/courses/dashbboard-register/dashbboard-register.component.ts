import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course.service';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashbboard-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './dashbboard-register.component.html',
  styleUrl: './dashbboard-register.component.scss',
})
export default class DashbboardRegisterComponent implements OnInit {
  @ViewChild('paymentModal') paymentModal!: ElementRef;
  courses: Course[] = [];
  paymentForm!: FormGroup;
  currentCourse: Course | null = null;
  private readonly courseService = inject(CourseService);

  ngOnInit(): void {
    this.getCourses();
    this.buildForm();
  }

  buildForm(): void {
    this.paymentForm = new FormGroup({
      amount: new FormControl(0),
    });
  }

  getCourses(): void {
    // Cambiar por el endpoint de juanda
    /*  this.courseService.getAllCourses().subscribe({
       next: (response) => {
         this.courses = response;
       },
       error: (error) => {
         console.error('Error fetching courses:', error);
       },
     }); */

    this.courses = [
      {
        id: 1,
        title: 'Introducción a Angular',
        description: 'Aprende los fundamentos de Angular y desarrolla aplicaciones web modernas.',
        price: 100,
        instructor: {
          id: 1,
          username: 'juanperez',
          roles: [{ id: 1, name: 'INSTRUCTOR' }]
        },
        category: {
          id: 1,
          name: 'Desarrollo Web'
        },
        contents: [
          'Introducción',
          'Componentes',
          'Servicios',
          'Rutas'
        ]
      },
      {
        id: 2,
        title: 'Spring Boot Básico',
        description: 'Curso para aprender a crear APIs REST con Spring Boot.',
        price: 0,
        instructor: {
          id: 2,
          username: 'mariagomez',
          roles: [{ id: 1, name: 'INSTRUCTOR' }]
        },
        category: {
          id: 2,
          name: 'Backend'
        },
        contents: [
          'Configuración de proyecto',
          'Controladores',
          'Persistencia',
          'Seguridad'
        ]
      },
      {
        id: 3,
        title: 'Python para Ciencia de Datos',
        description: 'Aprende Python desde cero y aplica sus conceptos en proyectos de ciencia de datos.',
        price: 150,
        instructor: {
          id: 3,
          username: 'carlossanchez',
          roles: [{ id: 1, name: 'INSTRUCTOR' }]
        },
        category: {
          id: 3,
          name: 'Ciencia de Datos'
        },
        contents: [
          'Sintaxis básica',
          'Manejo de datos con pandas',
          'Visualización con matplotlib',
          'Introducción a machine learning'
        ]
      },
      {
        id: 4,
        title: 'Diseño de Interfaces con Figma',
        description: 'Domina Figma para crear prototipos y diseños de interfaces atractivas.',
        price: 80,
        instructor: {
          id: 4,
          username: 'lauradiaz',
          roles: [{ id: 1, name: 'INSTRUCTOR' }]
        },
        category: {
          id: 4,
          name: 'Diseño UI/UX'
        },
        contents: [
          'Introducción a Figma',
          'Componentes y estilos',
          'Prototipado interactivo',
          'Colaboración en equipo'
        ]
      },
      {
        id: 5,
        title: 'Fundamentos de JavaScript',
        description: 'Domina los conceptos básicos y avanzados de JavaScript para desarrollo web.',
        price: 120,
        instructor: {
          id: 5,
          username: 'anatorres',
          roles: [{ id: 1, name: 'INSTRUCTOR' }]
        },
        category: {
          id: 1,
          name: 'Desarrollo Web'
        },
        contents: [
          'Variables y tipos de datos',
          'Funciones y objetos',
          'Manipulación del DOM',
          'Asincronía y promesas'
        ]
      },
      {
        id: 6,
        title: 'Administración de Bases de Datos con MySQL',
        description: 'Aprende a diseñar, crear y administrar bases de datos relacionales con MySQL.',
        price: 90,
        instructor: {
          id: 6,
          username: 'pedroalvarez',
          roles: [{ id: 1, name: 'INSTRUCTOR' }]
        },
        category: {
          id: 5,
          name: 'Bases de Datos'
        },
        contents: [
          'Modelado de datos',
          'Consultas SQL básicas',
          'Joins y subconsultas',
          'Optimización y seguridad'
        ]
      }
    ];
    // ...existing code...
  }

  goToPay(course: Course): void {
    this.currentCourse = course;

    if (course.price > 0) {
      this.paymentForm.patchValue({
        amount: course.price,
      });
      this.openCloseModal();
    } else {
      this.enroll();
    }
  }

  openCloseModal() {
    this.paymentModal?.nativeElement.classList.toggle('hidden');
  }

  clearData() {
    this.currentCourse = null;
    this.paymentForm.reset({
      amount: 0,
    });
  }

  pay() {

  }

  enroll() {
    //hacer el enrol
    this.clearData();
  }
}
