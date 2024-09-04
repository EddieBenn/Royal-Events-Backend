import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User, { UserAttributes } from "../../models/userModel/userModel";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import {Report} from '../../models/reportModel/reportModel'
import { v4 } from "uuid";

export const reportEvent = async (request: JwtPayload, response: Response) => {
  try {
    const eventId = request.params.id
    const userId = request.user.id
    const {report} = request.body
    const user:any = await User.findOne({where: {id:userId}}) as unknown as UserAttributes
    const eventInfo:any = await Event.findOne({ where: { id: eventId } }) as unknown as EventAttributes;

    if (!userId) {
      return response.status(400).json({
        status: "error",
        message: "Invalid user ID",
      });
    }
    if (!user) {
      return response.status(404).json({
        status: "error",
        message: "You have to login to report this event",
      });
    }
    if (!eventInfo) {
      return response.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }
    
    const newReport = await Report.create({
      id: v4(),
      owner_id: user.id,
      owner_name: user.user_name,
      event_id: eventInfo.id,
      report,
      report_time: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const findReport = await Report.findOne({where: {id:newReport.id}})

    if(!findReport){
      return response.status(200).json({
        status: `error`,
        message: `Report not successful`,
      })
    }
    return response.status(200).json({
      status: `success`,
      message: `Report successfully submitted`,
      findReport
    });

  } catch (error:any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};