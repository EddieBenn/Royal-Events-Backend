import { JwtPayload } from "jsonwebtoken"
import { Response } from "express"
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import { Op } from "sequelize";

export const userAttendedEvents = async (request: JwtPayload, response: Response) =>{
    try{
        const userId = request.user.id
        let userEvents = []
        if(!userId){
            return response.status(400).json({
                status:`error`,
                message:`You have to login to access this page`
            })
        }
        const pastEvent = await Event.findAll({
            // where:{
            //     event_date: {
            //         [Op.lt]:new Date()
            //     }
            // }
        })
        for(let a = 0; a < pastEvent.length; a++){
            let event = pastEvent[a].registered_users
            for(let b = 0; b< event.length; b++){
                if(event[b].id_of_user === userId){
                    userEvents.push(pastEvent[a])
                }
            }
        }
        if(userEvents.length===0){
            return response.status(400).json({
                status:`success`,
                message:`No atttended events at the moment`
            })
        }
        return response.status(200).json({
            status:`success`,
            message:`Attended events fetched successfully`,
            userEvents
        })
    }catch(error){
        console.log(error)
        return response.status(500).json({
            status:`error`,
            message:`Internal Server Error`
        })
    }
}