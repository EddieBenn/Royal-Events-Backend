import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Bank, { BankAttributes } from "../../models/bankAccountModel/bankModel";

export const userEditAccount = async (req: JwtPayload, res: Response) => {
    try {
        const userId = req.user.id
        const { bank_name, account_name, account_number } = req.body;

        if(bank_name === "" && account_name === "" && account_number === ""){
            return res.status(400).json({
                status: `error`,
                message: `At least one field must be filled`
            })
        }

    const updatedUserFields: Partial<BankAttributes> = {};

    if (bank_name !== "") {
      updatedUserFields.bank_name = bank_name;
    }

    if (account_name !== "") {
      updatedUserFields.account_name = account_name;
    }

    if (account_number !== "") {
        if(account_number.length !== 10){
            return res.status(400).json({
                status: `error`,
                message: `Account Number must be 10 characters`
            })
        }
      updatedUserFields.account_number = account_number;
    }

    const updatedBank: any = (await Bank.update(updatedUserFields, {
      where: { owner_id: userId },
    })) as unknown as BankAttributes;

    if(!updatedBank){
    return res.status(400).json({
        status: "error",
        method: req.method,
        message: "Bank details not updated successfully",
      });
    }
    const bank = (await Bank.findOne({
      where: { owner_id: userId },
    })) as unknown as BankAttributes;

    return res.status(200).json({
      status: "success",
      method: req.method,
      message: "Bank details updated successfully",
      bank
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      Error: "Internal Server Error",
    });
  }
};