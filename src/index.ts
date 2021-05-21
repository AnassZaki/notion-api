require("dotenv").config();

import Hapi from "@hapi/hapi";
import routes from "./routes";
import chalk from "chalk";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route(routes);

  await server.start();
  console.log(`[${chalk.blue("SERVER")}] running on %s`, server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
