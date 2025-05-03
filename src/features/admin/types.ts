import { Models } from 'node-appwrite';

export type Admin = Models.Document & {
    userId: string;
};
