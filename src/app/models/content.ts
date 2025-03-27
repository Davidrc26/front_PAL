export interface Content{
    id: number;
    file_url: string;
    type: string;
	course: number;
}

export interface ContentCreate{
    file_url: string;
    type: string;
	course: number;
}