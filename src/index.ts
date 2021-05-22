import express from "express"; // 서버 구축을 돕는 프레임워크
import connectDB from "./Logger/db";

const app = express();

import mongoose from "mongoose";
import config from "./config/index";
import Post from "./models/Post";

connectDB();

Post.createCollection();

app.use(express.json()); // input 값을 json형태로 받는다.
app.use("/api/post", require("./api/post"));

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app
  .listen(5000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
