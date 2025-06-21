import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //now upload the file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log("file is uploaded successfully to cloudinary", response.url);
        //delete the file from local storage
        // fs.unlinkSync(localFilePath); // delete the file from local storage after upload
        //return the response from cloudinary
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // delete the file from local storage when the file upload fails
        console.error("Error uploading file to Cloudinary:", error);
        return null;
    }
}

export {uploadOnCloudinary};