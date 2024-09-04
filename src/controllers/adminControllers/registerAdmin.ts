import { Request, Response } from "express";
import { validateAdminSchema } from "../../validators/validation";
import User, { UserAttributes, role } from "../../models/userModel/userModel";
import { v4 } from "uuid";
import { generateRegisterToken, hashPassword } from "../../helpers/helpers";
import { sendMail } from "../../utilities/notification";

export const registerAdmin = async (request: Request, response: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      user_name,
    } = request.body;
    const validateAdminInput = validateAdminSchema.safeParse(request.body);
    if (validateAdminInput.success === false) {
      return response.status(400).send({
        status: "error",
        method: request.method,
        message: validateAdminInput.error.issues,
      });
    }
    const checkAdminEmail = await User.findOne({ where: { email } });

    if (checkAdminEmail) {
      return response.status(400).json({
        status: `error`,
        message: `${email} already in use`,
      });
    }
    const checkAdminName = await User.findOne({ where: { user_name } });

    if (checkAdminName) {
      return response.status(400).json({
        status: `error`,
        message: `${user_name} already in use`,
      });
    }

    if (password !== confirm_password) {
      return response.status(400).json({
        status: `error`,
        message: `Password mismatch`,
      });
    }

    const adminId = v4();
    const passwordHash = await hashPassword(password);
    const newAdmin = await User.create({
      id: adminId,
      first_name,
      last_name,
      email,
      password: passwordHash,
      user_name,
      phone_number: "",
      profile_picture: "",
      address: "",
      state: "",
      zip_code: "",
      role: role.ADMIN,
      identity_document: "",
      is_completed_profile: true,
      isVerified: true,
      isBlocked: false,
      reports: [],
      isAddAccount: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const findUser = await User.findOne({
      where: { email },
    });
    if (!findUser) {
      return response.status(400).json({
        status: `error`,
        message: `contact dev`,
      });
    }
    const token = generateRegisterToken({
      id: findUser.id,
      email: findUser.email,
    });
    await sendMail(email, token);
    return response.status(200).json({
      status: `success`,
      message: `Admin Account Created for ${user_name}`,
      findUser,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `contact dev`,
    });
  }
};
