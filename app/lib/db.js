import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "frozeriastok",
};

const db = mysql.createPool(config);
export default db;