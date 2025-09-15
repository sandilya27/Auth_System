import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async () =>{
    try {
        mongoose.connection.on("connected", () => {
          console.log("Connected to MongoDB");
        });

        mongoose.connection.on("error", (err) => {
          console.log("Error while connecting to MongoDB", err);
        });

        mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.log(`error while connecting to db: ${error}`);
        process.exit(1)
    }
}

export default db;
