import { JwtPayload } from "jsonwebtoken";
import {Response, Request} from 'express'
import User from "../../models/userModel/userModel";

export const getUserProfile = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const user = await User.findOne({where: {id:userId}})
        if (user){
            return response.status(200).json({
                status:"success",
                message:"User Profile successful found",
                data: user
            })

        }
        return response.status(404).json({
            status:"error",
            message:"User not found, contact admin"
        })
        

    }catch(error:any){
        console.log(error.message);
        return response.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}