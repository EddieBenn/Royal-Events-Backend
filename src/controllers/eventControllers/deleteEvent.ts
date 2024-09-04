import {Response} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import {Event} from '../../models/eventModel/eventModel'

export const deleteEvent = async(request:JwtPayload, response:Response) => {
    try{
        const userId = request.user.id
        const eventId = request.params.id
        const event = await Event.findOne({where: {id:eventId}})
        if(!event){
            return response.status(404).json({
                status: `error`,
                message: `Event not found`
            })
        }
        await Event.destroy({where: {id:eventId}})
        const checkDestroy = await Event.findOne({where:{id:eventId}})
        if(checkDestroy){
            return response.status(400).json({
                status: `error`,
                message: `Unable to delete Event`
            })
        }
        const allEvents = await Event.findAll({})
        return response.status(200).json({
            status: `success`,
            message: `Event successfully deleted`,
            allEvents
        })
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`
        })
    }
}