const app = require("./server");
const chalk = require("chalk");

// const model = require("./tensorflow/model.json");
// const bin = require("./tensorflow/group1-shard1of1.bin");

const port = process.env.PORT || 8000;

// app.get("/model", (req, res) => {
//   res.send(model);
// });
// app.get("/bin", (req, res) => {
//   res.send(bin);
// });

app.listen(port, () => {
  console.log("Server started on " + chalk.blueBright(port) + ".");
});
