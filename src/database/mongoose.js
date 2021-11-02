const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(chalk.green("DB connection established"));
  })
  .catch((err) => console.error(`DB connection error ${chalk.red(err)}`));
