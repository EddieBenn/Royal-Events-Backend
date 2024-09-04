import {Comment} from '../../models/commentModel/commentModel'
import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import User, { UserAttributes } from "../../models/userModel/userModel";


export const getComments = async (req: JwtPayload, res: Response) => {
    try {
      const eventId = req.params.id;
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({
          status: `error`,
          message: `Unable to find event`,
        });
      }
      const comments = await Comment.findAll({where: {event_id: eventId}})


      if(!comments){
        return res.status(404).json({
            status: `error`,
            message: `Unable to fetch comments`,
          });
      }
      let mainComments:any = []
      let user;

      for(let index = 0; index < comments.length; index++){
        user = await User.findOne({where: {id:comments[index].owner_id}})
        if(user){
        mainComments.push({
            name: user?.user_name,
            picture: user?.profile_picture,
            comment: comments[index].comment,
            comment_time: comments[index].comment_time
        })
    }
      }
      if(mainComments.length > 0){
          return res.status(200).json({
            status: `success`,
            message: `Comments fetched successfully`,
            mainComments
          })
      }

      return res.status(400).json({
        status: `error`,
        message: `No Comments found`,
        mainComments
      })
  
    } catch (error: any) {
      console.log(error.message)
      res.status(500).json({
        status: "error",
        message: "Internal Server error",
      });
    }
  };