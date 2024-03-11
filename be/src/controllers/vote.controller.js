// controllers/VoteController.js
const BaseController = require("./baseController");
const { Vote } = require("../models");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

class VoteController extends BaseController {
	constructor() {
		super(Vote);
	}

	async upsert(req, res) {
		console.log("upsert", req.body);
		try {
			let item;
			if (req.body.id) {
				// If an ID is provided, update the existing document

				item = await this.model.findByIdAndUpdate(req.body.id, req.body, {
					new: true,
					runValidators: true,
				});
				if (!item) {
					// If no document is found with the given ID, send a 404 response
					return res.status(404).send("Item not found");
				}
			} else {
				// If no ID is provided, create a new document
				item = new this.model(req.body);
				await item.save();
			}
			res.status(201).send(item);
		} catch (error) {
			console.log("VoterController error", error);
			res.status(400).send("VoterController error" + JSON.stringify(error));
		}
	}
}

module.exports = new VoteController();
