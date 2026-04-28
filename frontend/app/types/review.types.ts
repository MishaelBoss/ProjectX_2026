export interface ReviewData {
    text: string;
    rating: number;
}

export interface Review {
    id: number;
    author_name: string;
    text: string;
    rating: number;
    created_at: string;
}