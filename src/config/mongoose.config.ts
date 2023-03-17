import mongoose from 'mongoose';

export default async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/your_database', {
        });
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}