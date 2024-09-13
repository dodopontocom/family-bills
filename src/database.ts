import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/family-bills';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra a aplicação se a conexão falhar
  }
};

export default connectDB;
