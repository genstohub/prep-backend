const courseMaterials = require("express").Router();
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const multer = require("multer");

const { uploadMaterialImages } = require("../../storage/multer/multerStorage");
const db = require("../../database/db");
const useBaseTranspiler = require("../../hooks/useBaseTranspiler");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

//  The Publish Route
courseMaterials.post("/new/publish", async (req, res) => {
  uploadMaterialImages(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // This is a specific Multer error (like file too large)
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ error: "File is too large. Max limit is 5MB." });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // This is a non-Multer error
      return res.status(500).json({ error: "Server upload error." });
    }
    try {
      const { topic, courseCode, content, user_id } = req.body;
      const files = req.files; // Array of files saved by multer

      // Try checking if there's a missing data
      if (!courseCode) throw new Error("No course code");

      //Resanitize the HTML
      // We allow the custom classes and data-attributes you built
      const cleanHtml = DOMPurify.sanitize(content, {
        ADD_TAGS: ["aside", "button"],
        ADD_ATTR: ["contenteditable", "data-action", "data-index", "style"],
      });

      // Match Images to local paths
      // We parse the clean HTML to swap blob URLs with local server paths
      const dom = new JSDOM(cleanHtml);
      const document = dom.window.document;
      const images = document.querySelectorAll("img");

      // Map the files by their fieldname for instant lookup
      // { "image_0": fileObject, "image_2": fileObject }
      const fileMap = {};
      files.forEach((file) => {
        fileMap[file.fieldname] = file;
      });

      // Match the images in the HTML to the files we actually received
      images.forEach((img) => {
        const idx = img.getAttribute("data-index");
        const targetField = `image_${idx}`;

        if (fileMap[targetField]) {
          // We found a match! Update the path
          img.src = `/public/images/materials/${fileMap[targetField].filename}`;
        } else {
          // This image exists in the HTML but no file was uploaded (it was likely deleted)
          // We should remove the "ghost" image wrap from the final HTML
          const wrap = img.closest(".figure-wrap");
          wrap ? wrap.remove() : img.remove();
        }

        // Cleanup attributes for the public view
        img.removeAttribute("data-index");
      });

      const finalOutput = dom.serialize();
      const course_id = courseCode.toString().toLowerCase();

      const { transpiledBase } = useBaseTranspiler(finalOutput);

      const materialPath = `public/files/materials/mt_${course_id}_${Date.now()}.base`;
      try {
        fs.writeFileSync(materialPath, transpiledBase);
      } catch (error) {
        console.log(error);
      }

      // 5. Save to Database (Simulation)
      await db("topics")
        .insert({
          course_id,
          user_id,
          topic,
          content_uri: materialPath,
          status: "pending",
          date_uploaded: new Date(),
        })
        .returning("*")
        .then((data) => {
          res.status(200).json({
            message: "Published successfully",
            path: req.files,
            data: data,
          });
        });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });
});

module.exports = courseMaterials;
