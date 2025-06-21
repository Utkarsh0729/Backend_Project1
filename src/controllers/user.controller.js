import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation of user details
    // check if user already exists
    // check for images, check for avatar
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password and refresh token from user object
    // check wether user creation is successful or not
    // return response to frontend

    
    // 1. get user details from frontend
    const {fullname, username, email, password} = req.body;
    console.log("email :", email);

    // 2. validation of user details
    // if any of the fields are empty, throw an error
    if([fullname, username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    if(!email.includes("@")) {
        throw new ApiError(400, "Invalid email address");
    }

    // 3. check if user already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if(existingUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // 4. check for images, avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required");
    }

    // 5. upload them to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    // check if avatar and cover image are uploaded successfully
    if(!avatar) {
        throw new ApiError(500, "Failed to upload avatar image");
    }
    

    //6. create user object - create entry in db
    const user = await User.create( {
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        email, 
        username: username.toLowerCase()
    })

    // 7. remove password and refresh token from user object
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // 8. check whether user creation is successful or not
    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    // 9. return response to frontend
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});


export { registerUser };