const app = require("./app");
const db = require("./db");
const config = require("./config/config");
const logger = require("./config/logger");

let server;

db.connectToDatabase()
	.then(() => {
		logger.info("Connected to MongoDB");
		server = app.listen(config.port, () => {
			server.on("error", onError);
			logger.info(`Listening on http://localhost:${config.port}/api/v1/test`);
		});
	})
	.catch((error) => {
		logger.error("Failed to connect to MongoDB", error);
		process.exit(1);
	});

const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info("Server closed");
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error) => {
	logger.error(error);
	exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
	logger.info("SIGTERM received");
	if (server) {
		server.close();
	}
});

process.on("SIGINT", () => {
	console.log("Received SIGINT, shutting down gracefully");
	server.close(() => {
		console.log("Server shut down");
	});
});

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			// uncomment the following line if you want to automatically try to reuse the port
			// server.close(() => server.listen(config.port));
			process.exit(1);
			break;
		default:
			throw error;
	}
}
