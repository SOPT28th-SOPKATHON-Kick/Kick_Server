import express from "express"; // 서버 구축을 돕는 프레임워크
import connectDB from "./Logger/db";
import cors from "cors";

const app = express();

import Post from "./models/Post";
import Review from "./models/Review";

app.use(cors());

connectDB();

Post.createCollection();
Review.createCollection();

app.use(express.json()); // input 값을 json형태로 받는다.
app.use("/api/post", require("./api/post"));
app.use("/api/email", require("./api/email"));
app.use("/api/review", require("./api/review"));

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
