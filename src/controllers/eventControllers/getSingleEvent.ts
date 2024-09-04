import { Request, Response } from 'express'
import Event, { EventAttributes } from '../../models/eventModel/eventModel'

export const getSingleEvent = async (request: Request, response: Response) => {
    try {
        const eventId = request.params.id
        const eventInfo = await Event.findOne({ where: { id: eventId } }) as unknown as EventAttributes;

        if (!eventId) {
            return response.status(400).json({
                status: 'Bad request',
                message: 'Contact Admin or Event Organizer(s)'
            });
        }

        if (!eventInfo) {
            return response.status(404).json({
                message: `Event not found`
            });
        }

        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `${eventInfo.title} found successfully`,
            data: eventInfo
        });

    } catch (error: any) {
        console.log(error.message)
        response.status(400).json({
            status: 'Error',
            method: request.method,
            message: error
        })
    }
}