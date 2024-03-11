const jwt = require("jsonwebtoken");
const { User } = require("../models");

const extractUserMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader && authHeader.startsWith("Bearer ")) {
		const token = authHeader.slice(7);
		//console.log("Token", token);
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const userId = decoded.sub;
			const user = await User.findById(userId);
			req.user = user;
		} catch (error) {
			return res.status(401).json({ message: "Invalid token - Middleware" });
		}
	}

	next();
};

module.exports = extractUserMiddleware;
