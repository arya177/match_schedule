import React, { useEffect, useState } from "react";
import "./style.css";
import MatchD from "./matchApi";
import PastMatchCard from "./PastMatchCard";
import OngoingMatchCard from "./OngoingMatchCard";
import UpcomingMatchCard from "./UpcomingMatchCard";
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD6YqulYoO8dikDWHSvJUtxfHL2Os0j9uo",
  authDomain: "trial-f8930.firebaseapp.com",
  databaseURL: "https://trial-f8930-default-rtdb.firebaseio.com",
  projectId: "trial-f8930",
  storageBucket: "trial-f8930.appspot.com",
  messagingSenderId: "679973073275",
  appId: "1:679973073275:web:c292d0f2e14ddb95104dde",
  measurementId: "G-PNKSDZZNXD"
};

const Match = () => {
  let MatchD;
  const [matchData, setMatchData] = useState(MatchD);
  const [tempDataName, settempDataName] = useState("past");
  // console.log(matchData);
  const fetchData = async (matchId) => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const dbref = ref(database);
    let snapshot = await get(child(dbref, "matchDetail/"+matchId));
    return snapshot.val();
  }
// let data = await fetchData(1);
// console.log(data);
  // const filterItem = (category) => {
  //   const updatedList = MatchD.filter((curElem) => {
  //     return curElem.category === category;
  //   });
  //   setMatchData(updatedList);
  // };
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const temp = ref(database, "matchDetail/");
    onValue(temp, async (snapshot) => {
      const data = await snapshot.val();
      console.log("Data:-",data);
      // console.log(data);
      await setMatchData(data);
      // console.log("Match Data:-",matchData);
      console.log(matchData);
      // setTimeout(()=>console.log(matchData),4000);
      // return data;
    })
    // setTimeout(()=>console.log(matchData),4000);
    // filterItem(tempDataName)
	console.log(tempDataName)
  }, [tempDataName]);

  return (
    <>
    {/* <h1>{matchData}</h1> */}
      <nav className="navbar">
        <div className="btn-group">
          <button
            className="btn-group__item"
            onClick={() => settempDataName("past")}
          >
            Past Matches
          </button>
          <button
            className="btn-group__item"
            onClick={() => settempDataName("present")}
          >
            Ongoing Matches
          </button>
          <button
            className="btn-group__item"
            onClick={() => settempDataName("future")}
          >
            Upcoming Matches
          </button>
        </div>
      </nav>

      {tempDataName === "past" ? (
        <PastMatchCard matchData={matchData} />
      ) : tempDataName === "present" ? (
        <OngoingMatchCard matchData={matchData} />
      ) : (
        <UpcomingMatchCard matchData={matchData} />
      )}
    </>
  );
};
export default Match;
