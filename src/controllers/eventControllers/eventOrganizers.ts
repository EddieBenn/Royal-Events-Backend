import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../../models/userModel/userModel";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";

export const eventOrganizers = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    const eventId = request.params.id;
    const organizers = request.body;
    const eventDetails = (await Event.findOne({
      where: { id: eventId },
    })) as unknown as EventAttributes;
    const allOrganizers:any = eventDetails.organizers;

    for (let i = 0; i < organizers.length; i++) {
      let organizer: any = await User.findOne({
        where: { user_name: organizers[i] },
      });
      let organizerInfo = {
        id_of_organizer: organizer.id,
        name_of_organizer: organizer.user_name,
        image_of_organizer: organizer.profile_picture,
      };
      allOrganizers.push(organizerInfo);
    }
    const update = await Event.update(
      { organizers: allOrganizers },
      { where: { id: eventId } }
    );
    if (!update) {
      return response.status(400).json({
        status: `success`,
        message: `Report unsucessful`,
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: `error`,
      message: `Unable to add organizers at the moment`,
    });
  }
};
