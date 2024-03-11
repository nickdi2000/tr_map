const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");
const axios = require("axios");
const {
	buildRecipe,
	generate,
	generateMealPlan,
} = require("../services/ai.service");

const { getImages } = require("../services/image.service");

const test = catchAsync(async (req, res) => {
	const user = await User.findOne();
	const data = {
		user: user,
		message: "Test api hit - tr_map v.1.2",
	};
	res.json(data);
});

const findRecipe = catchAsync(async (req, res) => {
	const { query } = req.params;
	const response = await generate(query);
	//const response = await buildRecipe(query);

	res.json({ data: response });
});

const mealPlan = catchAsync(async (req, res) => {
	const { query } = req.params;
	const response = await generateMealPlan(query);

	res.json(response);
});

const getImage = catchAsync(async (req, res) => {
	const { query } = req.params;
	const response = await getImages(query);
	console.log("res", response.src.medium);
	res.json({ data: response.src.medium });
});

const sample = {
	title: "Honey Garlic Baked Chicken Wings",
	description:
		"These delicious and easy to make honey garlic baked chicken wings are sure to become one of your family favorites.",
	ingredients: [
		"1/4 cup honey",
		"1/4 cup soy sauce",
		"3 cloves garlic, minced",
		"2 tablespoons ketchup",
		"2 tablespoons olive oil",
		"1/4 teaspoon ground ginger",
		"1/4 teaspoon cayenne pepper",
		"3 pounds chicken wings",
	],
	instructions: `  1. Preheat oven to 400 degrees F (200 degrees C).  2. In a small bowl, mix together honey, soy sauce, garlic, ketchup, olive oil, ground ginger and cayenne pepper.  3. Place the chicken wings in a 9x13 inch baking dish, and pour honey mixture over wings.   4. Toss gently to coat.  5. Bake in preheated oven for 40 minutes, or until chicken is cooked through and sauce is thick and bubbly; turning wings every 10 minutes.  `,
};

module.exports = {
	test,
	findRecipe,
	mealPlan,
	getImage,
};
