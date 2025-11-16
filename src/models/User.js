import clientPromise from '../lib/mongodb';
import bcrypt from 'bcryptjs';

const USERS_COLLECTION = 'users';

export class User {
  static async getCollection() {
    const client = await clientPromise;
    const db = client.db('launchpad');
    return db.collection(USERS_COLLECTION);
  }

  static async create({ username, email, password, firstName, lastName, role = 'user' }) {
    const collection = await this.getCollection();
    
    const existingUser = await collection.findOne({
      $or: [{ username }, { email }]
    });
    
    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  static async findByUsername(username) {
    const collection = await this.getCollection();
    return await collection.findOne({ username });
  }

  static async findByEmail(email) {
    const collection = await this.getCollection();
    return await collection.findOne({ email });
  }

  static async findByUsernameOrEmail(usernameOrEmail) {
    const collection = await this.getCollection();
    return await collection.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async findById(id) {
    const collection = await this.getCollection();
    const { ObjectId } = require('mongodb');
    return await collection.findOne({ _id: new ObjectId(id) });
  }
}
