import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Event from "../../models/eventModel/eventModel";
import User from "../../models/userModel/userModel";

export const disLikeEvent = async (req: JwtPayload, res: Response) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;

    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({
        status: `error`,
        message: `Unable to find event`,
      });
    }

    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user?.isVerified) {
      return res.status(401).json({
        status: "error",
        message:
          "Only verified users can like an event, update your profile to be able to like this event",
      });
    }

    let liked;

    //check if user already disliked
    for (let index = 0; index < event.dislikesArr.length; index++){
      if (event.dislikesArr[index] === userId) {
        liked = true;
        return res.status(401).json({
          status: "error",
          message: "You have already disliked this event",
        });
      }
    }
    //check if user liked and change to dislike
    let likesArray = event.likesArr
    let likesNum = event.likes
    for (let index = 0; index < likesArray.length; index++) {
      if (likesArray[index] === userId) {
        likesArray.splice(index, 1);
        likesNum--
        index--;
      }
    }

    await Event.update({likesArr:likesArray, likes:likesNum}, {where:{id:eventId}})

    const dislikedArr = event.dislikesArr;
    dislikedArr.push(userId);
    let dislikings = event.dislikes + 1;

    await Event.update(
      { dislikesArr: dislikedArr, dislikes: dislikings },
      { where: { id: eventId } }
    );

    return res.status(200).json({
      status: "success",
      message: "You have disliked this event",
    });

  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({
      status: "error",
      message: "Unable to dislike event",
    });
  }
};
