const axios = require("axios");

const api_key = "3f6cf7777e67e36fe1868699cb2bfdcd";

axios
  .get(
    "https://api.the-odds-api.com/v3/odds/?apiKey=3f6cf7777e67e36fe1868699cb2bfdcd&sport=americanfootball&region=uk&mkt=h2h&dateFormat=iso&oddsFormat=american"
  )
  .then((response) => {
    for (var i = 0; i < response.data.data.length; i++) {
      const teams = response.data.data[i].teams;
      const date = response.data.data[i].commence_time;
      const odds = response.data.data[i].sites[0].odds.h2h;
      return teams + " plays in " + date + " the odds are " + odds;
    }
  })
  .catch((error) => {
    console.log("Error status", error.response.status);
    console.log(error.response.data);
  });
