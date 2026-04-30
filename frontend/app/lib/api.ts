import { ReviewData } from '../types/review.types';
import { UserLogin, UserRegister } from '../types/user.types';
import { QuestionData } from '../types/feedback.types';
import axios from 'axios';
import { BookingData } from '../types/booking.types';

export const getReviews = async () => {
    const res = await axios.get('/reviews/');
    return res.data;
};

export const createReview = async (token: string, data: ReviewData) => {
    const res = await axios.post('/reviews/', data, {
        headers: { 
            Authorization: `Token ${token}` 
        },
    });
    return res.data;
};

export const login = async (data: UserLogin) => {
    const res = await axios.post('/login/', data);
    return res.data;
};

export const register = async (data: UserRegister) => {
    const res = await axios.post('/register/', data);
    return res.data;
};

export const sendQuestion = async (data: QuestionData) => {
    const res = await axios.post('/send-email/', data);
    return res.data;
};

export const createBooking = async (data: BookingData) => {
    const res = await axios.post('/coworking/booking/', data);
    return res.data;
};

export const getBookedSlots = async (date: string): Promise<{ time_start: string; time_end: string }[]> => {
    const res = await axios.get(`/coworking/booking/?date=${date}`);
    return res.data;
};
