const express = require("express");
//const lowdb = require("lowdb");
const app = express();
//const fileSync = require("lowdb/adapters/FileSync");
//const adapter = new fileSync("database.json");
//const database = lowdb(adapter);
const bodyParser = require("body-parser");
const port = process.env.port || 8000;
const databaseOperations = require("./local_modules/databaseOperations");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/products", async (req, res) => {
  const data = await databaseOperations.getProducts();
  res.send(data);
});

app.post("/api/cart", (req, res) => {
  const product = req.body;
  const data = databaseOperations.addToCart(product.name);
  res.status(data.status);
  res.send(data);
});

app.delete("/api/cart", (req, res) => {
  const product = req.body;
  const data = databaseOperations.removeFromCart(product.name);
  res.status(data.status);
  res.send(data);
});

app.get("/api/cart", async (req, res) => {
  const data = await databaseOperations.getCart();
  res.send(data);
});

app.listen(port, () => {
  console.log("Server started on port ", port);
  databaseOperations.initiateDatabase();
});
