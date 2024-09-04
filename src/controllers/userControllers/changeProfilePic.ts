import {Request, Response} from 'express'
import { JwtPayload } from 'jsonwebtoken'
import User from '../../models/userModel/userModel';


export const changeProfilePicture = async(request:JwtPayload, response:Response) => {
    try{
        const userId = request.user.id;
        if(request.file === undefined){
            return response.status(404).json({
                status: `error`,
                message: `No image selected`
            })
        }
        const profilePic = request.file.path
        const updatedUser = await User.update({profile_picture:profilePic},{where: {id:userId}})
        if(!updatedUser){
            return response.status(400).json({
                status: `error`,
                message: `Unable to update picture`
            })
        }
        const user = await User.findOne({where: {id:userId}})
        return response.status(200).json({
            status: `success`,
            message: `Profile picture successfully changed`,
            data: user
        })

    }catch(err:any){
        console.log(err.message)
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`
        })
    }
}