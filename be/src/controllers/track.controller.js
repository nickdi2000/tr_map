// controllers/TrackController.js
const BaseController = require("./baseController");
const { Track } = require("../models");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

class TrackController extends BaseController {
	constructor() {
		super(Track);
	}

	async list(req, res) {
		try {
			const items = await this.model.find().sort({ status: 1 });
			res.send(items);
		} catch (error) {
			res.status(400).send("Track errorr listing");
		}
	}

	async signup(req, res) {
		try {
			const { track_id, instrument, name } = req.body;
			const isBackup = req.body.isBackup || false;
			const track = await this.model.findById(track_id);
			const params = { instrument, name };
			if (isBackup) {
				params.isBackup = isBackup;
			}

			//keep it if its backup (removing other primaries as there can only be one), or if its not the same instrument
			//keep it so that it can fall back to them if the other person removes themself
			// if (!isBackup) {
			// 	track.musicians = track.musicians.filter((musician) => {
			// 		return musician.isBackup || musician.instrument !== instrument;
			// 	});
			// }

			track.musicians.push(params);

			await track.save();
			res.status(201).send(track);
		} catch (error) {
			res.status(400).send("Track error" + JSON.stringify(error));
		}
	}

	async update(req, res) {
		const id = req.params.id;

		try {
			const params = req.body;
			const track = await this.model.findById(id);
			track.status = params.status;
			await track.save();
			res.status(201).send(track);
		} catch (error) {
			res.status(400).send("Track error" + JSON.stringify(error));
		}
	}

	//lets re-write the remove function to be the same, but if the 'name' is not found, it just removes the matching instrument
	async remove(req, res) {
		try {
			const { track_id, instrument, name } = req.body;
			const track = await this.model.findById(track_id);

			if (!name) {
				track.musicians = track.musicians.filter((musician) => {
					return musician.instrument !== instrument;
				});
			} else {
				track.musicians = track.musicians.filter((musician) => {
					return musician.name !== name;
				});
			}

			await track.save();
			res.status(201).send({ data: track, success: true });
		} catch (error) {
			console.log("Removing musician error", error);
			res.status(400).send("Track error" + JSON.stringify(error));
		}
	}
}

module.exports = new TrackController();
