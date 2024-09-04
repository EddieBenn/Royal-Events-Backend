import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import User, { UserAttributes } from "../../models/userModel/userModel";
import { v4 } from "uuid";
import {Comment} from '../../models/commentModel/commentModel'


export const addComment = async (req: JwtPayload, res: Response) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;
    const comment = req.body.comments
    const event = await Event.findByPk(eventId);
    const user = await User.findOne({
        where: { id: userId },
      });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Only verified users can comment on an event",
      });
    }
    if (!event) {
      return res.status(404).json({
        status: `error`,
        message: `Unable to find event`,
      });
    }
    const newComment = await Comment.create({
      id: v4(),
      owner_id: userId,
      owner_name: user.user_name,
      event_id: eventId,
      comment,
      likes: 0,
      dislikes: 0,
      likesArr: [],
      dislikesArr: [],
      comment_time: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()

    })

    const findComment = await Comment.findOne({where: {id:newComment.id}})
    if(findComment) {
      return res.status(200).json({
        status: `success`,
        message: `Comment Successfully added`,
        data: findComment
      })
    }
    return res.status(400).json({
      status: `error`,
      message: `Unable to add Comment`,
    })

  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({
      status: "error",
      message: "Internal Server error",
    });
  }
};
