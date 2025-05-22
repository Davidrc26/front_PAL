import { Course } from "./course";
import { User } from "./user";


export interface Enrollment {
    id: number;
    user: User;
    course: Course;
}


export interface EnrollmentCreate {
    user: number;
    course: number;
}