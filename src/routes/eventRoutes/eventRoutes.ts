import express from "express";
import { createEvents } from "../../controllers/eventControllers/createEvent";
import { getUpcomingEvents } from "../../controllers/eventControllers/getUpcomingEvents";
import { getSingleEvent } from "../../controllers/eventControllers/getSingleEvent";
import { userEvent } from "../../controllers/eventControllers/userEvent";
import { generalAuthoriser } from "../../middleware/authorization";
import { upload } from "../../utilities/upload";
import { addComment } from "../../controllers/eventControllers/addComment";
import { likeEvent } from "../../controllers/eventControllers/likeEvent";
import { disLikeEvent } from "../../controllers/eventControllers/dislikeEvent";
import { getComments } from "../../controllers/eventControllers/getComments";
import { userAttendedEvents } from "../../controllers/eventControllers/userAttendedEvents";
import { reportEvent } from "../../controllers/eventControllers/reportEvent";
import { deleteEvent } from "../../controllers/eventControllers/deleteEvent";
import { userPays } from "../../controllers/userPayment/userPayment";

const router = express.Router();

router.post("/create", upload.single("event_image"), generalAuthoriser, createEvents);
router.get("/upcoming_events", getUpcomingEvents);
router.get("/get-single-event/:id", generalAuthoriser, getSingleEvent);
router.get("/get-my-events", generalAuthoriser, userEvent);
router.post("/add-comment/:id", generalAuthoriser, addComment);
router.post("/like/:id", generalAuthoriser, likeEvent);
router.post("/dislike/:id", generalAuthoriser, disLikeEvent);
router.get("/comments/:id", generalAuthoriser, getComments)
router.get("/attended_events", generalAuthoriser, userAttendedEvents)
router.post("/report/:id", generalAuthoriser, reportEvent);
router.delete("/delete_event/:id", generalAuthoriser, deleteEvent)
router.post("/payment/:id", upload.single("event_image"), generalAuthoriser, userPays)

export default router;
// generalAuthoriser,
//upload.single("event_image"),
