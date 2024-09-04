import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Ticket from "../../models/ticketModel/ticketModel";
import Earning from "../../models/earningsModel/earningsModel";

export const getUserEarnings = async (request: JwtPayload, response: Response) => {
    try {
        const userId = request.user.id;
        let  getAllEarnings = await Earning.findAll({where: {owner_id:userId}})

        if (getAllEarnings.length === 0) {
            return response.status(404).json({
                message: `No Earnings found`
            })
        }

        getAllEarnings = getAllEarnings.sort((a:any, b:any)=>{
            return b.createdAt - a.createdAt
        })


        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `Earnings found successfully`,
            getAllEarnings
        })

    } catch (error: any) {
        console.log(error.message)
        response.status(400).json({
            status: 'error',
            method: request.method,
            message: 'Internal Server Error'
        })
    }
}