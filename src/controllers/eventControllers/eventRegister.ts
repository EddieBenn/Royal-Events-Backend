import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User, { UserAttributes } from "../../models/userModel/userModel";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";

export const registerUser = async (request: JwtPayload, response: Response) => {

    try {
        const userId = request.user.id;
        const eventId = request.params.id
        const findUser = await User.findOne({ where: {id: userId} }) as unknown as UserAttributes
        const eventInfo:any = await Event.findOne({ where: { id: eventId } }) as unknown as EventAttributes;

        const {
            email,
            password,
            ticket_types,
            tickets_bought
        } = request.body;

        const checkUserEmail = await User.findOne({ where: { email } }) as unknown as UserAttributes;

        if (checkUserEmail) {
            return response.status(400).json({
                status: `error`,
                message: `The email address ${email} has already registered for this event`,
            });
        }

        if (findUser.password !== password) {
            return response.status(400).json({
                status: `error`,
                message: `Password incorrect`
            })
        }

        if (!userId) {
            return response.status(400).json({
            status: "error",
            message: "Invalid user ID",
            });
        }

        if (!findUser) {
            return response.status(404).json({
                status: "error",
                message: "You have to login to register for this event",
            });
        }

        const registeredUser = {
            id_of_user: findUser.id,
            name_of_user: `${findUser.first_name} ${findUser.last_name}`,
            ticket_types: ticket_types,
            no_of_tickets: tickets_bought,
            total_amount_paid: ''
        }

        let eventRegisteredUsers = []
        eventRegisteredUsers = eventInfo.registered_users
        eventRegisteredUsers.push(registeredUser)

        const update = await Event.update({registered_users: eventRegisteredUsers}, {where: { id:eventId }})

        if (!update) {
            return response.status(400).json({
                status: `success`,
                message: `Event register unsuccessful`
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `User Registered Successfully`,
            findUser,
        });

    } catch (error: any) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};