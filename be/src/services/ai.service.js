const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

// const { Configuration, OpenAIApi } = require("openai");

const { OpenAI } = require("openai");

const apiKey = ""; //process.env.OPENAI_API_KEY;
const openai = new OpenAI({
	apiKey: apiKey,
});

const buildRecipe = async (message) => {
	console.log("building prompt..");
	let prompt = `Using the following key words provided.  Please return a recipe that is somewhat healthy and easy to make. 
  the recipes should be returned as a json object with the following structure: { title: '', description: '', incredients: [], instructions: []}`;
	prompt += "Here are the Key words: " + message;
	const response = await executeGPT(prompt);
	return response;
};

async function executeGPT(message) {
	try {
		const configuration = new Configuration({
			apiKey: apiKey,
		});

		const openai = new OpenAIApi(configuration);
		let prompt = message;

		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: prompt,
			max_tokens: prompt.length + 500,
		});

		let response = completion.data.choices[0].text.trim();
		//response = response.replace(/\n/g, "");
		console.log("response", response);
		try {
			const returnObject = JSON.parse(response);
			return returnObject;
		} catch (e) {
			return {
				success: false,
				message: "failed to parse json",
			};
		}
	} catch (err) {
		console.log("api error", err);
		return {
			success: false,
			message: "API Failed",
		};
	}
}

async function generate(message) {
	try {
		let prompt = `Using the following key words provided.  Please return a recipe that is somewhat healthy and easy to make.`;
		//prompt += "Here are the Key words: " + message;

		const chatPrompt = [
			{
				role: "system",
				content:
					"You are a recipe generator that returns a recipe based on the query from the user.  The recipe MUST be a JSON object with this exact structure: { title: '', description: '', incredients: [], instructions: ''}  ",
			},
			{ role: "user", content: "Here are the Key words: " + message },
		];

		const res = await executeTurbo(chatPrompt);

		return res;
	} catch (err) {
		console.log("error updating", err);
		throw new Error(err);
	}
}

async function generateMealPlan(params) {
	console.log("Generating meal plan with params", params);
	//return samplePlan;
	try {
		const chatPrompt = [
			{
				role: "system",
				content:
					"You are a recipe generator that returns a list of dinner meals based on the parameters from the user.  The recipes must be an array of JSON objects like this: [{ title: '', description: '', ingredients:[{item: '', measurement: ''}] }]. And you must try your best to use common ingredients across all of the meals. main_ingredients should be a comma separated list ",
			},
			{
				role: "user",
				content:
					"Please return ONLY the array of recipes.  Here are the parameters: " +
					params,
			},
		];

		const res = await executeTurbo(chatPrompt);
		res.tags = params;

		return res;
	} catch (err) {
		console.log("error updating", err);
		throw new Error(err);
	}
}

function removeUnderscores(str) {
	return str.replace(/_/g, " ");
}

async function executeTurbo(chatPrompt) {
	try {
		const response = await openai.chat.completions.create({
			model: "gpt-4-0613", //"gpt-3.5-turbo",
			messages: chatPrompt,
		});
		let rawResponse = response.choices[0].message.content;
		console.log("rawResponse", rawResponse);
		const res = JSON.parse(rawResponse);
		return res;
	} catch (err) {
		console.log("error executing turbo", err);
		throw new Error(err);
	}
}

const samplePlan = [
	{
		title: "Quinoa Burgers",
		description:
			"This is a light, healthy meal packed with protein and omega-3s",
		ingredients: [
			{ item: "Ground beef", measurement: "2 lbs" },
			{ item: "quinoa", measurement: "1 cup" },
			{ item: "garlic cloves", measurement: "3" },
			{ item: "olive oil", measurement: "2 tablespoons" },
			{ item: "salt", measurement: "1 teaspoon" },
			{ item: "pepper", measurement: "1/2 teaspoon" },
		],
	},
	{
		title: "Roasted Veggies and Quinoa",
		description:
			"A simple, healthy, and flavorful dinner packed with nutrients",
		ingredients: [
			{ item: "mixed veggies", measurement: "4 cups" },
			{ item: "quinoa", measurement: "1 cup" },
			{ item: "olive oil", measurement: "2 tablespoons" },
			{ item: "salt", measurement: "1 teaspoon" },
			{ item: "pepper", measurement: "1/2 teaspoon" },
			{ item: "garlic cloves", measurement: "2" },
		],
	},
	{
		title: "Grilled Chicken and Quinoa",
		description:
			"Healthy and protein-packed, this meal keeps you satisfied without the guilt",
		ingredients: [
			{ item: "chicken breasts", measurement: "2 lbs" },
			{ item: "quinoa", measurement: "1 cup" },
			{ item: "olive oil", measurement: "2 tablespoons" },
			{ item: "garlic cloves", measurement: "2" },
			{ item: "salt", measurement: "1 teaspoon" },
			{ item: "pepper", measurement: "1/2 teaspoon" },
		],
	},
];

module.exports = {
	buildRecipe,
	generate,
	generateMealPlan,
};
