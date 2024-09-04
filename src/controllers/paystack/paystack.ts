import {Request, Response} from 'express'
import { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";


export const payStack = async (request: JwtPayload, response: Response) => {

try{
    const https = require("https");

    let {email, amount} = request.body;
    amount = amount * 100

    const params = JSON.stringify({
      email,
      amount
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const req = https
      .request(options, (res:Response) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
            response.send(data)
          // console.log(JSON.parse(data));
        });
      })
      .on("error", (error:any) => {
        console.error(error);
      });

    req.write(params);
    req.end();

}catch(error:any){
    console.log(error.message)
}
};