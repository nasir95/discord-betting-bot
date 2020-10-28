const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios");

require("dotenv").config();

API_KEY = process.env.API_KEY;

client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content === "!bet") {
    axios
      .get(
        `https://api.the-odds-api.com/v3/odds/?apiKey=${API_KEY}&sport=americanfootball&region=uk&mkt=h2h&dateFormat=iso&oddsFormat=american`
      )
      .then((response) => {
        for (var i = 0; i < response.data.data.length; i++) {
          const teams = response.data.data[i].teams;
          const date = response.data.data[i].commence_time;
          const odds = response.data.data[i].sites[0].odds.h2h;
          msg.reply([teams + " plays in " + date + " the odds are " + odds]);
        }
      })

      .catch((error) => {
        console.log("Error status", error.response.status);
        console.log(error.response.data);
      });
  }
});
client.login(process.env.TOKEN);
