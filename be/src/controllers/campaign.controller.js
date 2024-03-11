// controllers/CampaignController.js
const BaseController = require("./baseController");
const { Campaign, Candidate } = require("../models");
const mongoose = require("mongoose");
class CampaignController extends BaseController {
	constructor() {
		super(Campaign);
	}

	listChildRecords = async (req, res) => {
		const { id, childModel } = req.params;
		const camaign_id = id;
		//get all candidates plus the vote count for each candidate
		const candidates = await Candidate.aggregate([
			{ $match: { campaign: mongoose.Types.ObjectId(camaign_id) } },
			{
				$lookup: {
					from: "votes", // the collection name in MongoDB
					localField: "_id", // the field from the Candidate collection
					foreignField: "candidate", // the corresponding field from the Vote collection
					as: "votes", // the field where the joined data will be placed
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
		//const candidates = await Candidate.find({ campaign: id });

		res.send(candidates);
	};

	upsert = async (req, res) => {
		console.log("upsert", this.model);

		if (!req.body.code) {
			req.body.code = req.body.title.replace(" ", "-");
		}
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
			console.log("campaign  error", error);
			res.status(400).send("campaign controller error" + JSON.stringify(error));
		}
	};

	getByCode = async (req, res) => {
		//console.log("getByCode", req.params.code);
		try {
			const campaignWithCandidates = await Campaign.aggregate([
				{ $match: { code: req.params.code } },
				{
					$lookup: {
						from: "candidates", // the collection name in MongoDB
						localField: "_id", // the field from the Campaign collection
						foreignField: "campaign", // the corresponding field from the Candidate collection
						as: "candidates", // the field where the joined data will be placed
					},
				},
			]);

			if (campaignWithCandidates.length) {
				if (campaignWithCandidates[0].status !== "active") {
					return res
						.status(201)
						.send({ status: campaignWithCandidates[0].status });
				}

				if (!campaignWithCandidates[0].candidates?.length) {
					return res.status(201).send({ status: "no_candidates" });
				}

				res.json(campaignWithCandidates[0]);
			} else {
				//res.status(404).send("Campaign not found");
				res.status(404).send({ message: "Code not Found" });
			}
		} catch (error) {
			res.status(500).send(error);
		}
	};

	async destroy(req, res) {
		try {
			const item = await Campaign.findByIdAndDelete(req.params.id);
			//also delete all candidates
			const candidates = await Candidate.deleteMany({
				campaign: req.params.id,
			});
			//TODO: ALSO DELETE votes

			if (!item) {
				return res.status(404).send("Item not found");
			}
			res.send(item);
		} catch (error) {
			res.status(400).send("Campaign Destroy	 error" + JSON.stringify(error));
		}
	}

	async show(req, res) {
		try {
			const item = await Campaign.findById(req.params.id);
			if (!item) {
				return res.status(404).send("Campaign not found");
			}
			res.json(item);
		} catch (error) {
			res.status(400).send("Campaign Show error" + JSON.stringify(error));
		}
	}
}

module.exports = new CampaignController();
