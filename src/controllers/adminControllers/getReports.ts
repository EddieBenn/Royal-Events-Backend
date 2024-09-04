import { adminAuthoriser } from "../../middleware/authorization";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import { Response, Request, NextFunction } from "express";
import {Report} from "../../models/reportModel/reportModel"

export const getEventReports = async (
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

    const reports = await Report.findAll({where: {event_id: eventId}})

    if(!reports){
        return response.status(400).json({
            status: `error`,
            message: "No reports found",
          });
    }

    return response.status(200).json({
            status: `success`,
            message: "Reports Found Successfully",
            reports
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      error: "Internal Server Error",
    });
  }
};
