import express from "express";
import { adminAuthoriser } from "../../middleware/authorization";
import { deleteEvents } from "../../controllers/adminControllers/deleteEvent";
import { eventBlocked } from "../../controllers/adminControllers/blockedEvent";
import { eventUnblocked } from "../../controllers/adminControllers/unblockEvent";
import { getUserComments } from "../../controllers/adminControllers/getComments";
import { registerAdmin } from "../../controllers/adminControllers/registerAdmin";
import { getFlaggedEvents } from "../../controllers/adminControllers/getFlaggedEvents";
import { getEventReports } from "../../controllers/adminControllers/getReports";

const router = express.Router();

router.delete("/deleteEvent", adminAuthoriser , deleteEvents )
router.post("/block_event/:id", adminAuthoriser , eventBlocked )
router.post("/unblock_event/:id", adminAuthoriser , eventUnblocked )
router.get("/getComments",  getUserComments)
router.post("/register", registerAdmin)
router.get("/flagged", adminAuthoriser, getFlaggedEvents)
router.get("/get_reports/:id", adminAuthoriser,  getEventReports)

export default router;
