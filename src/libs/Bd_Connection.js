import mongoose from "mongoose";

const connection_DB = async () => {
  try {
    const DB_Connection = process.env.DB_URL;

    if (!DB_Connection) {
      console.log("DB_URL Missing");
    }

    const connetion = await mongoose.connect(DB_Connection, {
      dbName: "E_commerce",
    });

    console.log("=========Connected===============");
  } catch (error) {
    console.log(error.message);
  }
};


export default connection_DB