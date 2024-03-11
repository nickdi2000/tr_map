// controllers/CandidateController.js
const BaseController = require("./baseController");
const { Candidate } = require("../models");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
class CandidateController extends BaseController {
	constructor() {
		super(Candidate);
	}
	//how would you fix this function so that it still worked even if there was no file? it should still save the candidate info, and it should update if the id exists

	insert = async (req, res) => {
		const storage_path = process.env.STORAGE_DIR || "/uploads"; // "./audio/";

		let filename,
			compressedFilename,
			inputPath,
			outputPath,
			outputPathCompressed;
		const { body } = req;

		if (req.file) {
			filename = req.file.originalname;
			inputPath = req.file.path;
			//body.image = req.body.originalName;
			const newFileName = "comp-" + req.body.originalName;
			outputPath = path.join(storage_path, newFileName);

			body.image = newFileName;

			try {
				// Image compression with sharp
				await sharp(inputPath)
					.resize(800) // Resize, keeping aspect ratio
					.jpeg({ quality: 30 }) // Convert to JPEG with 80% quality
					.toFile(outputPath);

				console.log("File name saving as ", filename);

				// Optionally, delete the original uploaded file to save space
				fs.unlink(inputPath, (err) => {
					if (err) console.log(err);
				});
			} catch (error) {
				console.error(error);
				return res.status(500).send("Error processing image.");
			}
		}

		try {
			let data;
			if (body.id) {
				// If ID exists, update the candidate
				data = await Candidate.findByIdAndUpdate(body.id, body, { new: true });
			} else {
				// If no ID, create a new candidate
				data = await Candidate.create(body);
			}

			res.json({ data });
		} catch (error) {
			console.error(error);
			res.status(500).send("Error processing candidate data.");
		}
	};

	async list(req, res) {
		//get all Candidate records, and the count of votes for each candidate
		try {
			const candidates = await Candidate.aggregate([
				{
					$lookup: {
						from: "votes",
						localField: "_id",
						foreignField: "candidate",
						as: "votes",
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						image: 1,
						votes: { $size: "$votes" },
					},
				},
			]);
			res.json(candidates);
		} catch (error) {
			console.error(error);
			res.status(500).send("Error processing candidate data.");
		}
	}
}

module.exports = new CandidateController();
