import { Request, Response } from "express";
import { Op } from 'sequelize'
import Event from '../../models/eventModel/eventModel'

export const getAllEvents = async (request: Request, response: Response) => {
    try {

        const getAllEvents = await Event.findAll({})

        if (getAllEvents.length === 0) {
            return response.status(404).json({
                message: `No Events found`
            })
        }

        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `Events found successfully`,
            data: getAllEvents
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