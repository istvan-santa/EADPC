// src/utils/uploadImage.js
import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "realisation_upload");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dmhepcgzo/image/upload",
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Erreur d'upload :", error);
    return null;
  }
};
