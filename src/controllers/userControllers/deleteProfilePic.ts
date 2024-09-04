import { Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel/userModel";

export const deleteProfileImage = async (request:JwtPayload ,response:Response) => {
    try{
        const userId = request.user.id;
        const user = await User.findOne({where: {id:userId}})
        if (user){
            await User.update({profile_picture:""}, {where: {id:userId}})
            const updatedUser = await User.findOne({where: {id:userId}})
            return response.status(200).json({
                status:"success",
                message:"Profile picture successful deleted",
                data: updatedUser
            })

        }
        return response.status(400).json({
            status:"error",
            message:"Profile picture cannot be deleted at the moment"
        })
        

    }catch(error:any){
        console.log(error.message);
        return response.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}



