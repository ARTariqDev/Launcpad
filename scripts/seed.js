const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env' });

const uri = process.env.MONGODB_URI;

async function seedUsers() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('launchpad');
    const usersCollection = db.collection('users');

    await usersCollection.deleteMany({});
    console.log('Cleared existing users');


    const testPassword = await bcrypt.hash('test123', 10);
    const adminPassword = await bcrypt.hash('LaunchpadAdmin4321!', 10);


    const users = [
      {
        username: 'test',
        email: 'test@launchpad.com',
        password: testPassword,
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'admin',
        email: 'admin@launchpad.com',
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const result = await usersCollection.insertMany(users);
    console.log(`Successfully seeded ${result.insertedCount} users:`);
    console.log('- test (password: test123) - role: user');
    console.log('- admin (password: LaunchpadAdmin4321!) - role: admin');
    
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

seedUsers();
