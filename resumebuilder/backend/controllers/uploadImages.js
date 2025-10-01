import fs from "fs";
import path from "path";
import Resume from "../models/resumeModel.js";
import upload from "../middleware/uploadMiddleware.js";

export const uploadResumeImages = async () => {
  try {
    upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: "File Upload Failed", error: err.message });
      }
      const resumeId = req.parms.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
      if (!resume) {
        res.status(400).json({ message: "Resume not found or unauthorized", error: err.message });
      }
      const uploadsFolder = path.join(process.cwd(), "uploads");
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const newThumbnail = req.files.thumbnail?.[0];
      const newProfileImage = req.files.profileImage?.[0];

      if (newThumbnail) {
        if (resume.thumbnailLink) {
          const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
          if (fs.existsSync(oldThumbnail)) {
            fs.unlinkSync(oldThumbnail);
          }
          resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }
      }

      if (newProfileImage) {
        if (resume.profileInfo?.profilePreviewUrl) {
          const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
          if (fs.existsSync(oldProfile)) {
            fs.unlinkSync(oldProfile);
          }
          resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }
      }
      await resume.save();
      res.status(200).json({ message: "Image uploaded Successfully", thumbnailLink: resume.thumbnailLink, profilePreviewUrl: resume.profileInfo.profilePreviewUrl });
    });
  } catch (err) {
    console.error("Error in uploading image : ", err);
    res.status(500).json({ message: "File Upload images", error: err.message });
  }
};
