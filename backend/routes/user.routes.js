import express from "express"
import { askToAssistant, getCurrentUser, updateAssistant } from "../controllers/user.controllers.js"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"
import { aiRateLimiter } from "../middleware/rateLimiter.js";
const userRouter=express.Router()

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.post("/update",isAuth,upload.single("assistantImage"),updateAssistant)
userRouter.post("/asktoassistant",isAuth,aiRateLimiter,askToAssistant)

export default userRouter