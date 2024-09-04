import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User, { UserAttributes } from "../../models/userModel/userModel";

export const userEditProfile = async (req: JwtPayload, res: Response) => {
  try {
    const userId = req.user.id;
    const { phone_number, address, state, zip_code } = req.body;

    if (
      phone_number === "" &&
      address === "" &&
      state === "" &&
      zip_code === ""
    ) {
      return res.status(400).json({
        status: `error`,
        message: `At least one field must be filled`,
      });
    }

    const updatedUserFields: Partial<UserAttributes> = {};

    if (phone_number !== "") {
      updatedUserFields.phone_number = phone_number;
    }

    if (address !== "") {
      updatedUserFields.address = address;
    }

    if (state !== "") {
      updatedUserFields.state = state;
    }

    if (zip_code !== "") {
      updatedUserFields.zip_code = zip_code;
    }

    const updatedUser: any = (await User.update(updatedUserFields, {
      where: { id: userId },
    })) as unknown as UserAttributes;

    if (!updatedUser) {
      return res.status(400).json({
        status: "error",
        method: req.method,
        message: "User details not updated successfully",
      });
    }
    const user = (await User.findOne({
      where: { id: userId },
    })) as unknown as UserAttributes;

    return res.status(200).json({
      status: "success",
      method: req.method,
      message: "User details updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      Error: "Internal Server Error",
    });
  }
};
