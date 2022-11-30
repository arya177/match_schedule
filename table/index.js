const express = require("express");
const bodyParser = require("body-parser");
const matchFunctions = require("./matchFunctions")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

require("./firebaseConfig")
app.get("/admin/create", (req, res) => {
  res.sendFile("/home/tony/trial/public/admin_create.html");
});

app.post("/admin/create", async (req, res) => {
  await matchFunctions.createMatch(req.body.ID, req.body.dateTime, req.body.Team1ID, req.body.Team2ID);
  res.redirect("/admin/create");
});

app.get("/admin/update", (req, res) => {
  res.sendFile("/home/tony/trial/public/admin_update.html");
});

app.post("/admin/update", async (req, res) => {
  let matchID = req.body.matchID;
  let currInnings = req.body.currInnings;
  let team1Run = req.body.team1Run;
  let team2Run = req.body.team2Run;
  let data = await matchFunctions.fetchData(matchID);

  if (team1Run.length != 0) {
    let totalBall = data.Team1Score.length - 1;
    let wicket = data.Team1Wicket;
    let extras = data.Team1Extra;
    let prev = data.Team1prev;
    if ((totalBall - extras) % 6 == 0)
      prev = totalBall + 1;
    if (team1Run.length == 1 && team1Run === 'w')
      wicket++;
    else if (team1Run.length == 2)
      extras++;
    await matchFunctions.Team1Update(matchID, currInnings, wicket, extras, team1Run, prev ,data.Team1Score);
  } else {
    let totalBall = data.Team2Score.length;
    let wicket = data.Team2Wicket;
    let extras = data.Team2Extra;
    let prev = data.Team2prev;
    if ((totalBall - extras) % 6 == 0)
      prev = totalBall;
    if (team2Run.length == 1 && team2Run === 'w')
      wicket++;
    else if (team2Run.length == 2)
      extras++;
    await matchFunctions.Team2Update(matchID, currInnings, wicket, extras, team2Run, prev,data.Team2Score);
  }
  data = await matchFunctions.fetchData(matchID);
  console.log(data);
  let team1score = await matchFunctions.totalScore(data.Team1Score, data.Team1Extra, data.Team1Wicket);
  let team1over = await matchFunctions.getOver(data.Team1Score, data.Team1prev, data.Team1Extra);
  console.log("Team 1 Score :", team1score[0] + "/" + team1score[1]);
  console.log("Team 1 over :", team1over[0], "Current Over :", team1over[1]);
  let team2score = await matchFunctions.totalScore(data.Team2Score, data.Team2Extra, data.Team2Wicket);
  let team2over = await matchFunctions.getOver(data.Team2Score, data.Team2prev, data.Team2Extra);
  console.log("Team 2 Score :", team2score[0] + "/" + team2score[1]);
  console.log("Team 2 over :", team2over[0], "Current Over :", team2over[1]);
  res.redirect("/admin/update");
});

app.listen('3000', () => {
  console.log("Server Is Running at port 3000");
});
