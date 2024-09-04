import { Response } from "express";
import Bank from "../../models/bankAccountModel/bankModel";
import { JwtPayload } from "jsonwebtoken";

export const getUserBankAccount = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    const userId = request.user.id
    const userBankDetails = await Bank.findOne({where: {owner_id:userId}});

    if (!userBankDetails) {
      return response.status(404).json({
        status: `error`,
        message: `No Bank Account Found`,
      });
    }

    return response.status(200).json({
      status: "success",
      method: request.method,
      message: `Bank Account found successfully`,
      userBankDetails
    });
  } catch (error: any) {
    console.log(error.message);
    response.status(400).json({
      status: "error",
      method: request.method,
      message: "Internal Server Error",
    });
  }
};
