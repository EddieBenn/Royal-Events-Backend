import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { UserAttributes } from "../../models/userModel/userModel";

export const verifyUser = async (request: JwtPayload, response: Response) => {
  try {
    const token = request.params.token;
    const decode: any = jwt.verify(token, `${process.env.APP_SECRET}`);
    const userId = decode.id;
    const user = (await User.findOne({
      where: { id: userId },
    })) as unknown as UserAttributes;
    if (user) {
      await User.update({ isVerified: true }, { where: { id: userId } });
      return response.status(400).json({
        status: `success`,
        message: `You have been successfully Verified`,
      });
    } else {
      return response.status(400).json({
        status: `error`,
        message: `Verification failed`,
      });
    }
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};
