const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

  