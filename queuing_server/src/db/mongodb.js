const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect(process.env.DB_CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}

module.exports = {
  connect,
};
