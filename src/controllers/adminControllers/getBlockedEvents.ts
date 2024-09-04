import { Response } from 'express'
import Event, { EventAttributes } from '../../models/eventModel/eventModel'
import { JwtPayload } from 'jsonwebtoken';
import User, { UserAttributes } from '../../models/userModel/userModel';

export const getBlockedEvents = async (request: JwtPayload, response: Response) => {
    try {

        const userId = request.user.id

        const findUser = await User.findAll({ where: { id: userId } }) as unknown as UserAttributes

        if (findUser.role === 'User') {
            return response.status(402).json({
                status: "error",
                message: "User is not an admin"
            })
        }

        const getBlockedEvents = await Event.findAll({ where: { isBlocked: true } }) as unknown as EventAttributes;

        if (getBlockedEvents.length === 0) {
            return response.status(404).json({
                message: `No blocked events found`
            });
        }

        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `Blocked events found successfully`,
            data: getBlockedEvents
        });

    } catch (error: any) {
        console.log(error.message)
        response.status(400).json({
            status: 'error',
            method: request.method,
            message: "Internal Server Error"
        })
    }
}