// src/utils/cloudinaryService.js

export const uploadToCloudinary = async (file, uploadPreset = "realisation_upload") => {
  const cloudName = "dmhepcgzo"; // Ton cloud name
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Erreur lors de l'upload Cloudinary :", error);
    throw error;
  }
};
