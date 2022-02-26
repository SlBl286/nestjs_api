import { Body, Controller, Get, Post } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }


    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log({
            dto,
        });
        if (dto.email) {
            
        }
        return this.authService.sigup();

    }

    @Post('signin')
    signin(){
        return this.authService.login();
    }

    @Get('signup')
    signup_get(){
        return {"msg": "singup page"}
    }
}
