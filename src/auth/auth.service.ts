import { Injectable } from "@nestjs/common";
import { User,Bookmark } from "@prisma/client";
@Injectable({})
export class AuthService{
    login(){
        return {"msg": "you are signed"}
    }
    sigup(){
        return {"msg": "Signup Page"}
    }

}

