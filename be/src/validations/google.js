const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
	"399348495751-am7t90so1qa081lol5atg5jvsiuhb0ml.apps.googleusercontent.com"
);

async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience:
			"399348495751-am7t90so1qa081lol5atg5jvsiuhb0ml.apps.googleusercontent.com",
	});
	const payload = ticket.getPayload();
	const userid = payload["sub"];
	// If request specified a G Suite domain:
	// const domain = payload['hd'];
	return payload;
}

export default verify;
