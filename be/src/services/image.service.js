const fetch = require("node-fetch");

const api = {
	pexels_key: "Vu1UhK2h7eDYXkrKnqva0GrVP19hQV1o41zSsyltIy2GGoErG0Tt3Zb3", // krezzo "563492ad6f91700001000001b67a929eee72400084ed23a118bb64e7",
	pexels_url: "https://api.pexels.com/v1",
};

const getImages = (userQuery = null) => {
	const amount = 2;
	let imgArray = [];
	let selected_image = null;

	// const client = createClient(this.pexels_key);
	const query = userQuery ?? "Dinner"; //parent

	const _getImages = async (url = "") => {
		const response = await fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
				Authorization: api.pexels_key,
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
		});
		return response.json();
	};

	const images = _getImages(
		`${api.pexels_url}/search?query=${query}&per_page=${amount}`
	)
		.then((photos) => {
			imgArray = photos.photos;
			selected_image = photos.photos[0];
			return photos.photos[0];
		})
		.catch(function (error) {
			console.log(error);
			return [];
		});

	return images;
};

module.exports = {
	getImages,
};
