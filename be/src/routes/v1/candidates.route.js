const express = require("express");
const multer = require("multer");

const storage_path = process.env.STORAGE_DIR || "/uploads"; // "./audio/";

const storage = multer.diskStorage({
	destination: storage_path, //"./audio/",
	filename: function (req, file, cb) {
		const originalName = `${Date.now()}-${file.originalname}`;
		cb(null, originalName); //this is the default filename and will be available in controller by req.file.originalName
		req.body.originalName = originalName;
	},
});

const upload = multer({ storage });

const router = express.Router();

router.route("/").post(upload.single("file"), candidatesController.insert);
router.route("/").get(candidatesController.list);

module.exports = router;
