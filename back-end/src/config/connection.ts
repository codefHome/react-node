
import { Sequelize } from "sequelize-typescript";

import { Items } from './../models/models';
import dotenv from "dotenv";
dotenv.config(); 
const connection = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "5432"),
  logging: false,
  models: [Items],
});

export default connection;
