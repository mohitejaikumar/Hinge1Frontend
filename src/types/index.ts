export interface Profile {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    home_town: string;
    religion: string;
    occupation: string;
    dating_type: string;
    preferred_gender: string;
    images: {
        id: number;
        url: string;
    }[];
    behaviour: Prompt[];
}

export interface Prompt {
    id:number;
    question: string;
    answer: string;
}
