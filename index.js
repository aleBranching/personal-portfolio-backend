require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

let { BOT_TOKEN, SERVER_URL, MY_CHATID, WEBHOOK_TOKEN } = process.env;
// Of the form of
//  https://api.telegram.org/bot<token>/METHOD_NAME

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const URI = `webhook/${BOT_TOKEN}`;

const WEBHOOK_URL = SERVER_URL + URI;

const MY_URI = "/" + URI;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  //   console.log("the res: ", res);
  //   console.log(MY_CHATID);
  console.log("the res.data", res.data);
};

app.post(MY_URI, async (req, res) => {
  console.log("here");
  console.log(req.body);
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: MY_CHATID,
    text: "dummmy text",
  });
  return res.send();
});
app.post("/", async (req, res) => {
  console.log(req.body);
});

app.listen(process.env.PORT || 5000, async () => {
  console.log("listening on port " + process.env.PORT);
  await init();
});
