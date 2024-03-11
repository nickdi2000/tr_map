// controllers/baseController.js
class BaseController {
	constructor(model) {
		this.model = model;
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
			console.log("baseController error", error);
			res.status(400).send("BaseController error" + JSON.stringify(error));
		}
	}

	async show(req, res) {
		try {
			const item = await this.model.findById(req.params.id);
			if (!item) {
				return res.status(404).send("Item not found");
			}
			res.send(item);
		} catch (error) {
			res.status(400).send("BaseController error" + JSON.stringify(error));
		}
	}

	async list(req, res) {
		try {
			// const user_id = req.user.id;
			// const items = await this.model.find({ user: user_id });
			const items = await this.model.find();
			res.send(items);
		} catch (error) {
			res.status(400).send("BaseController error" + JSON.stringify(error));
		}
	}

	async destroy(req, res) {
		try {
			const item = await this.model.findByIdAndDelete(req.params.id);
			if (!item) {
				return res.status(404).send("Item not found");
			}
			res.send(item);
		} catch (error) {
			res.status(400).send("BaseController error" + JSON.stringify(error));
		}
	}

	// ... define other CRUD operations (read, update, delete) ...
}

module.exports = BaseController;
