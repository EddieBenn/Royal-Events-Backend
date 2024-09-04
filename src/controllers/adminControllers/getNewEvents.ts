import { Request, Response } from "express";
import { Op } from "sequelize";
import Event from "../../models/eventModel/eventModel";

export const getNewEvents = async (request: Request, response: Response) => {
  try {
    const presentDay = new Date();

    const getNewEvents = await Event.findAll({
      where: {
        event_start_date: {
          [Op.gt]: presentDay,
        },
        isBlocked: false,
      },
    });

    if (getNewEvents.length === 0) {
      return response.status(404).json({
        message: `No Upcoming Events found`,
      });
    }

    return response.status(200).json({
      status: "Success",
      method: request.method,
      message: `Upcoming events found successfully`,
      data: getNewEvents,
    });
  } catch (error: any) {
    response.status(400).json({
      status: "error",
      method: request.method,
      message: "Error",
    });
  }
};
