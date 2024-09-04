import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Event from "../../models/eventModel/eventModel";
import { v4 } from "uuid";
import User, { UserAttributes } from "../../models/userModel/userModel";

export const createEvents = async (request: JwtPayload, response: Response) => {
  try {
    const userId = request.user.id;

    const user = (await User.findOne({
      where: { id: userId },
    })) as unknown as UserAttributes;

    if (!user.is_completed_profile) {
      return response.status(401).json({
        status: `error`,
        message: `Only users with completed profiles can organize events`,
      });
    }
    if (!user.isVerified) {
      return response.status(401).json({
        status: `error`,
        message: `You cannot organize an event until you verify your email account`,
      });
    }
    const eventId = v4();

    const userDetails = {
      id_of_organizer: userId,
      name_of_organizer: user.user_name,
      image_of_organizer: user.profile_picture,
      email_of_organiser: user.email,
      username_of_oganiser: user.user_name
    };
    let organizers = [userDetails]
    const createdEvent = await Event.create({
      ...request.body,
      id: eventId,
      owner_id: userId,
      ticket_types: JSON.parse(request.body.ticket_types),
      tickets_bought: 0,
      likes: 0,
      likesArr: [],
      dislikesArr: [],
      event_image: request?.file?.path,
      isBlocked: false,
      organizers: organizers,
      registered_users: [],
      dislikes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    let foundEvent = await Event.findOne({ where: { id: eventId } });

    if (!foundEvent) {
      return response.status(404).json({
        status: `error`,
        message: `Unable to create an event`,
      });
    }
    response.status(200).json({
      status: "success",
      method: request.method,
      message: "Event created successfully",
      data: foundEvent,
    });
  } catch (error: any) {
    console.log(error.message)
    response.status(500).json({
      status: "error",
      message: "Event creation unsuccessful",
      error: error.message
    });
  }
};
