const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const config = require("./config/key");

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// application/json
app.use(express.json());

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB is connected!!");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) =>
  res.send("Hello World! 새해 복 많이 받으세요! 앙 개꿀띠")
);

app.post("/register", (req, res) => {
  // 회원가입할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => console.log(`Example app Listening on port ${port}!`));
