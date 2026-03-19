const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const port = process.env.Port || 4000;

app.listen(port, () => {
  console.log(`Server is listining on port ${port}`);
});