import { Request, Response } from "express";
import { Jwt, JwtPayload } from "jsonwebtoken";
import User from "../../models/userModel/userModel";

export const updateProfile = async (request: JwtPayload, response: Response) => {
  try {
    const userId = request.user.id;
    const { identity_document, phone_number, address, state, zip_code } =
      request.body;
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      await User.update(
        {
          phone_number: phone_number,
          address: address,
          state: state,
          zip_code: zip_code,
          identity_document: request.file.path
        },
        { where: { id: userId } }
      );
      await User.update({
        is_completed_profile: true
      },
      {where: {id:  userId}})
      const updateUser = await User.findOne({where: {id:userId}})
      return response.status(200).json({
        status: "success",
        message: "Profile updated",
        data: updateUser
      });
    }
    return response.status(400).json({
      status: "error",
      message: "Unable to update profile",
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
