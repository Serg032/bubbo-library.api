const express = require("express");
const app = express();
export const port = 3000;
import books from "./routers/books.js";

app.use(express.json());
app.use("/books", books);

export default app;
