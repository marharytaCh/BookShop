import { PassportLocalDocument } from 'mongoose';

export interface UserInterface extends PassportLocalDocument {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
}