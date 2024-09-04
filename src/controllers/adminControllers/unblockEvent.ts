import { adminAuthoriser } from "../../middleware/authorization";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import { Response, Request, NextFunction } from "express";

export const eventUnblocked = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const eventId = request.params.id;
    const event = await Event.findByPk(eventId);

    if (!event) {
      return response.status(404).json({ error: "Event not found" });
    }

    await Event.update({ isBlocked: false }, {where: {id:eventId}});

    return response.status(200).json({
      message: "Event unblocked successfully",
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      error: "Internal Server Error",
    });
  }
};
