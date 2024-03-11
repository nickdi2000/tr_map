const mongoose = require("mongoose");
const { Track, User } = require("../models");
const config = require("../config/config");
const bcrypt = require("bcryptjs");

console.log("Running Seeder..", config.mongodb);

const connectionString = config.mongodb; //'mongodb://127.0.0.1:27017/node-boilerplate';

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function seed() {
	const tracks = [
		{
			artist: "Green Day",
			track: "Basket Case",
		},
		{
			artist: "Weezer",
			track: "Buddy Holly",
		},
		{
			artist: "Nirvana",
			track: "About a Girl",
		},
		{
			artist: "The Smashing Pumpkins",
			track: "Bullet with Butterfly Wings",
		},
		{
			artist: "The Smashing Pumpkins",
			track: "Today",
		},
		{
			artist: "Rage Against the Machine",
			track: "Bulls on Parade",
		},
		{
			artist: "Hole",
			track: "Celebrity Skin",
		},
		{
			artist: "Oasis",
			track: "Supersonic",
		},
		{
			artist: "Oasis",
			track: "Don't Look Back in Anger",
		},
		{
			artist: "Red Hot Chili Peppers",
			track: "Give it Away",
		},
		{
			artist: "Red Hot Chili Peppers",
			track: "Aeroplane",
		},
		{
			artist: "Radiohead",
			track: "Karma Police",
		},
		{
			artist: "Foo Fighters",
			track: "Big Me",
		},
		{
			artist: "Foo Fighters",
			track: "Everlong",
		},
		{
			artist: "Queens of the Stone Age",
			track: "No One Knows",
		},
		{
			artist: "Weezer",
			track: "No One Else",
		},
		{
			artist: "Weezer",
			track: "Say It Ain't So",
		},
		{
			artist: "Blink 182",
			track: "All the Small Things",
		},
		{
			artist: "Blink 182",
			track: "Dammit",
		},
		{
			artist: "The Offspring",
			track: "Come Out and Play",
		},
		{
			artist: "Green Day",
			track: "Hitchin' a Ride",
		},
		{
			artist: "Green Day",
			track: "Having a Blast",
		},
		{
			artist: "Matt Good Band",
			track: "Load Me Up",
		},
	];

	// User.collection.dropIndex("email_1", function (err, result) {
	// 	if (err) {
	// 		console.error("Error dropping index:", err);
	// 	} else {
	// 		console.log("Index dropped:", result);
	// 	}

	// 	// Close the connection after the operation is complete
	// 	mongoose.connection.close();
	// });

	try {
		await Track.deleteMany({});
		const insertedTracks = await Track.create(tracks);
		console.log("Seeder: Data seeded successfully", insertedTracks);
		mongoose.connection.close();
	} catch (error) {
		console.error("Seeder: Error seeding data", error);
	}
}

seed();

//to run this seeder, run the following command:
// node src/seeders/track.seeder.js
