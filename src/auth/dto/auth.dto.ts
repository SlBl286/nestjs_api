import {  } from "class-validator";
export interface AuthDto {
    @IsEmail()
    email: string

    password: string
} 
