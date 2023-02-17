
import "reflect-metadata";
import express from "express";
import connection from "./config/connection";
import router from './routes';
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())
app.use("/", router)
export default app;