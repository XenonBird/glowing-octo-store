import mongoose from 'mongoose';

export async function dbConnect() {
  try {
    mongoose.connect(process.env.DB_URI, { dbName: 'octopus_mobi' });
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.log('MongoDB connection error', err);
    });
  } catch (error) {
    console.log('Database connection Error', error);
  }
}
