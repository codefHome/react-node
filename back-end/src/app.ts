
import "reflect-metadata";
import express from "express";
import connection from "./config/connection";
import router from './routes';
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())
app.use("/", router)

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  } catch (error) {
    console.error(error);
     process.exit(1);
  }
};



void start();
export default app;