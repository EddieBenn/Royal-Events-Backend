import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User, { UserAttributes } from "../../models/userModel/userModel";
import { v4 } from "uuid";
import Bank from "../../models/bankAccountModel/bankModel";

export const addAccount = async (request: JwtPayload, response: Response) => {
  try {
    const userId = request.user.id
    const {bank_name, account_name, account_number} = request.body
    const user:any = await User.findOne({where: {id:userId}}) as unknown as UserAttributes

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
    const testBank = await Bank.findOne({where: {owner_id:userId}})

    if(testBank){
      return response.status(200).json({
        status: `error`,
        message: `You have already added a bank account, you can edit your account details`,
      })
    }
    const userAccount = await Bank.create({
      id: v4(),
      owner_id: user.id,
      owner_name: user.user_name,
      bank_name,
      account_name,
      account_number,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const findAccount = await Bank.findOne({where: {id:userAccount.id}})

    if(!findAccount){
      return response.status(400).json({
        status: `error`,
        message: `Account not successfully added`,
      })
    }

    await User.update({isAddAccount:true}, {where: { id: userId }})
    const updatedUser = await User.findOne({where: {id:userId}})
    return response.status(200).json({
      status: `success`,
      message: `Account successfully added`,
      findAccount,
      updatedUser
    });

  } catch (error:any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};