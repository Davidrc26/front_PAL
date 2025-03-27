import { Category } from "./category";
import { User } from "./user";

export interface Course{
    id: number;
	title: string;
    description: string;
	price: number;
	instructor: User;
	category: Category; 
	contents: Array<string>;
}

export interface CourseCreate{
    title: string;
    description: string;
	price: number;
	instructor: number;
	category: number;
}