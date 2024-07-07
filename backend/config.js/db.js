import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        // mongoose ko connect method use grxau database sanga connect grna
        // Here, await is used to pause the execution of the connectDB function until the promise returned by mongoose.connect is resolved. The mongoose.connect method is asynchronous and returns a promise that resolves when the connection to the MongoDB database is successful.
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to Mongodb Database`);
    } catch (error) {
        console.log(`Error in Mongodb ${error}`);
    }
}

export default connectDB;