import { Request, Response } from "express";
import User, { UserAttributes, role } from "../../models/userModel/userModel";
import { validateRegisterSchema } from "../../validators/validation";
import { v4 } from "uuid";
import { generateRegisterToken, hashPassword } from "../../helpers/helpers";
import { sendMail } from "../../utilities/notification";

export const registerUser = async (request: Request, response: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      user_name,
    } = request.body;

    const validateInput = validateRegisterSchema.safeParse(request.body);
    if (validateInput.success === false) {
      return response.status(400).send({
        status: "error",
        method: request.method,
        message: validateInput.error.issues,
      });
    }
    const checkUserEmail = await User.findOne({ where: { email } });

    if (checkUserEmail) {
      return response.status(400).json({
        status: `error`,
        message: `The email address ${email} already in use`,
      });
    }

    const checkUserName = await User.findOne({ where: { user_name } });

    if (checkUserName) {
      return response.status(400).json({
        status: `error`,
        message: `The username ${user_name} already in use`,
      });
    }

    if (password !== confirm_password) {
      return response.status(400).json({
        status: `error`,
        message: `Password mismatch`,
      });
    }

    if (password.length < 6) {
      return response.status(400).json({
        status: `error`,
        message: `Password must be at least six characters long`,
      });
    }
    const userId = v4();

    const passwordHash = await hashPassword(password);

    const newUser = await User.create({
      id: userId,
      first_name,
      last_name,
      email,
      password: passwordHash,
      user_name,
      phone_number: "",
      profile_picture: "",
      address: "",
      state: "",
      identity_document: "",
      zip_code: "",
      role: role.USER,
      is_completed_profile: false,
      isVerified: false,
      isBlocked: false,
      reports: [],
      isAddAccount: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const findUser = await User.findOne({ where: { email } }) as unknown as UserAttributes;
    if (!findUser) {
      return response.status(400).json({
        status: `error`,
        message: `User not registered, contact admin`,
      });
    }
    const token = generateRegisterToken(
      {
      id: findUser.id,
      email: findUser.email
      }
    )
    await sendMail(email, token)
    return response.status(200).json({
      status: `success`,
      message: `User Registered Successfully`,
      findUser,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};
