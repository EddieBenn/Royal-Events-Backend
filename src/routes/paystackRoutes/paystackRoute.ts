import express from "express";
import { payStack } from "../../controllers/paystack/paystack";
import { upload } from "../../utilities/upload";
import { generalAuthoriser } from "../../middleware/authorization";


const router = express.Router();


router.post("/pay", generalAuthoriser, payStack)

export default router;