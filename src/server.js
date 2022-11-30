const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.BLOGGIEDB)
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, console.log(`Server is running on ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("error", (err) => {
  console.log(err);
});
