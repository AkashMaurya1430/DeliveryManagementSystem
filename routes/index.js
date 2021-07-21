const authRouter = require("./authRouter.js");
const dashboardRouter = require("./dashboardRouter.js");

const initRoutes = (app) => {
  app.use("/", authRouter);

  app.use("/dashboard", dashboardRouter);
};

module.exports = initRoutes;
