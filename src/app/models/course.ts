import { Category } from "./category";
import { User } from "./user";

export interface Course{
    id: number;
	title: string;
    description: string;
	price: number;
	difficulty: string;
	createdAt: Date;
	averageRating: number;
	instructor: User;
	category: Category; 
	contents: Array<string>;
}

export interface CourseCreate{
    title: string;
    description: string;
	price: number;
	difficulty: string;
	instructor: number;
	category: number;
}