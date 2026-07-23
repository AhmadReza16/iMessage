import express from "express";
import {
    getConversationsForSidebar,
    getMessages,
    getUsersForSidebar,
    sendMessage
} from "../controllers/message.controller.js";
import { protecRoute} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.use(protecRoute);

router.get("/users", getUsersForSidebar);
router.get("/conversations", getConversationsForSidebar);
router.get("/:id", getMessages);
router.get("/send/:id", upload.single("media"), sendMessage);

export default router;