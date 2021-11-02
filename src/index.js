const app = require("./server");
const chalk = require("chalk");

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server started on " + chalk.red(port) + ".");
});
