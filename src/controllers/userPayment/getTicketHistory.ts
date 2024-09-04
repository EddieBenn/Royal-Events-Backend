import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Ticket from "../../models/ticketModel/ticketModel";

export const getTicketHistory = async (request: JwtPayload, response: Response) => {
    try {
        const userId = request.user.id;
        let getAllTickets = await Ticket.findAll({where: {owner_id:userId}})

        if (getAllTickets.length === 0) {
            return response.status(404).json({
                message: `No Tickets found`
            })
        }

        getAllTickets = getAllTickets.sort((a:any, b:any)=>{
            return b.createdAt - a.createdAt
        })
        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `Tickets found successfully`,
            getAllTickets
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