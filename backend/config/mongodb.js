import mongoose from "mongoose";

const connetBD = async () => {

    mongoose.connection.on('connected', () => console.log('Database Connected'));  
    await mongoose.connect(`${process.env.MONGODB_URI}/Prescripto`);
}

export default connetBD;