import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { 
    changeCurrentPassword, 
    getCurrentUser, 
    getUserChannelDetails, 
    loginUser, logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    updateAvatar, 
    updateCoverImage 
} from "../controllers/user.controller.js";


const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/update-account-details").patch(verifyJWT, updateAccountDetails);

router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateAvatar);

router.route("/update-cover-image").patch(verifyJWT, upload.single("coverImage"), updateCoverImage);

router.route("/channel/:username").get(verifyJWT, getUserChannelDetails);

router.route("/history").get(verifyJWT, getWatchHistory);

export default router;