import bcrypt from "bcrypt";
import Client from "../config/dbConn.js";

import { config } from "dotenv";
config();

export const createAssignmentHandler = async (req, res) => {
  try {
    
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
