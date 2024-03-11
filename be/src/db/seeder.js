
const mongoose = require('mongoose');
const { User } = require('../models');
const { Company } = require('../models');
const db = require('../db');
const { userServices } = require('../services');

const companySeedData = [
  {
    name: 'Demo Corp.',
    email: 'demo@demo.com',
    code: 'demo'
  }
];
//password
const userSeedData = [
  { name: 'Admin Smith', email: 'admin@example.com'},
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com'},
];

const addPasswords = (users) => {
  let password = 'password123';
  users.forEach((user) => {
    user.password = password;
    user.isEmailVerified = true;
  });
}

db.connectToDatabase()
  .then(async () => {
    console.log('Connected to the database');
    
    // Seed the company data
    const companies = await Company.insertMany(companySeedData);
    addPasswords(userSeedData);

    // Get the company ID
    const companyId = companies[0]._id; // Assuming we want to use the first company's ID

    // Update the user seed data with the company ID
    const modifiedUserSeedData = userSeedData.map((user) => ({
      ...user,
      companyId,
    }));

    //delete Users:
    await User.deleteMany({});

    try {
      await Promise.all(modifiedUserSeedData.map(async (user) => {
        await User.create(user);
        console.log("Created user: ", user.email);
      }));
    
      console.log("Done seeding users");
      mongoose.disconnect();
    } catch (error) {
      console.error('Error seeding data:', error);
      mongoose.disconnect();
    }

    
    // User.insertMany(modifiedUserSeedData)
    //   .then(() => {
    //     console.log('Data seeded successfully');
    //     mongoose.disconnect();
    //   })
    //   .catch((error) => {
    //     console.error('Error seeding data:', error);
    //     mongoose.disconnect();
    //   });

  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
