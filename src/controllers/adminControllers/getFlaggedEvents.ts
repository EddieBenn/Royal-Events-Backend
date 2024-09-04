import { Request, Response } from "express";
import { Op } from "sequelize";
import Event from "../../models/eventModel/eventModel";
import Report from "../../models/reportModel/reportModel"

export const getFlaggedEvents = async (
  request: Request,
  response: Response
) => {
  try {

    const reportedEventsArray = await Report.findAll({})

    if(reportedEventsArray.length === 0){
      return response.status(404).json({
        status: `error`,
        message: `No Flagged Events`,
      });
    }

    const reportedEvents = []

    for(let i = 0; i<reportedEventsArray.length; i++){
      reportedEvents.push(await Event.findOne({where: {id:reportedEventsArray[i].event_id}}))
    }

if(reportedEvents.length > 0){
    return response.status(200).json({
      status: "success",
      method: request.method,
      message: `Events found successfully`,
      reportedEvents,
    });
  }

  } catch (error: any) {
    console.log(error.message);
    response.status(400).json({
      status: "error",
      method: request.method,
      message: "Internal Server Error",
    });
  }
};
