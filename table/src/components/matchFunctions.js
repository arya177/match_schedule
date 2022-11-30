const database = require("./firebaseConfig");
const { child, onValue, ref, get, set, update } = require("firebase/database");

const createMatch = async (ID, dateTime, Team1ID, Team2ID) => {
  await set(ref(database, "matchDetail/" + ID), {
    _id: ID,
    timeDate: dateTime,
    Innings: 0,
    Team1Id: Team1ID,
    Team2Id: Team2ID,
    Team1Score: ['-'],
    Team2Score: ['-'],
    Team1Extra: 0,
    Team2Extra: 0,
    Team1Wicket: 0,
    Team2Wicket: 0,
    Team1prev: 1,
    Team2prev: 1
  }).then(() => {
    console.log("Data inserted");
  }).catch(err => console.log(err));
}

const Onupdate = async (matchID) => {
  const temp = ref(database, "matchDetail/" + matchID);
  onValue(temp, async (snapshot) => {
    const data = await snapshot.val();
    console.log("In fetch ", data);
    return data;
  })
}

const fetchData = async (matchId) => {
  const dbref = ref(database);
  let snapshot = await get(child(dbref, "matchDetail/"+matchId));
  return snapshot.val();
}

const Team1Update = async (matchID, currInnings, wicket, extras, run, prev, score) => {
  await update(ref(database, "matchDetail/" + matchID), {
    "Innings": currInnings, "Team1Wicket": wicket, "Team1Extra": extras, "Team1prev": prev, "Team1Score": [...score, run]
  }).then(() => {
    console.log("Data Updated for Team 1");
  }).catch(err => console.log(err));
};

const Team2Update = async (matchID, currInnings, wicket, extras, run, prev, score) => {
  await update(ref(database, "matchDetail/" + matchID), {
    "Innings": currInnings, "Team2Wicket": wicket, "Team2Extra": extras, "Team2prev": prev, "Team2Score": [...score, run]
  }).then(() => {
    console.log("Data Updated for Team 2");
  }).catch(err => console.log(err));
};

const totalScore =  (score, extra, wicket) => {
  let currscore = 0;
  for (var i = 1; i < score.length; i++) {
    if (score[i].length == 1 && score[i] != "w")
      currscore += parseInt((score[i]));
  }
  let temp1=currscore+extra;
  return temp1.toString()+"/"+wicket.toString();
};

const getOver = (score, prev, extra) => {
  const thisOver = new Array();
  let curr = score.length - 1;
  let currOver = Math.floor((curr - extra) / 6);
  let currBall = (curr - extra) % 6;
  for (let i = prev; i <= curr; i++) {
    thisOver.push(score[i]);
  }
  let st="";
  let temp="";
  thisOver.forEach(item=>{
    temp+=item;
    temp+=" ";
  })
  st=(currOver.toString())+"."+currBall.toString();

  // return st;
  return [st,temp]
}

module.exports = {
  getOver, totalScore, createMatch, fetchData, Team1Update, Team2Update
}
