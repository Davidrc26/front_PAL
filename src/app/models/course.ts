export interface Course{
    id: number;
	title: string;
    description: string;
	price: number;
	instructor: number;
	category: number; 
	contents: Array<string>;
}

export interface CourseCreate{
    title: string;
    description: string;
	price: number;
	instructor: number;
	category: number;
}