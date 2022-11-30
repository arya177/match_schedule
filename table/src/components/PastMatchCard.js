import React, { useState } from 'react';
import "./style.css";
import { totalScore } from './matchFunctions';

const PastMatchCard = (props) =>  {
	console.log(props);
	// let matchData=[];
	if(!(props.matchData)){
		return (
			<>
			</>
		);
	}
	let matchData=props["matchData"];
	console.log(matchData);
  return (
		<>
			<section className="main-card--container">
			{matchData.map((curElem) => {
				if(curElem.category !== "past"){
					return(
						<></>
					)
				}
				return(
					<>
					<div className="past card-container" key={curElem.id}>
				
					<div className="team1">
						<div className="logo1">
							<img src="./images/team1.png" alt="vs" className="l1"/>
						</div>
						<div className="txt1"><h4>{curElem.team1name}</h4></div>
					</div>
					<div className="sc1">
					<h4>({totalScore(curElem.Team1Score,curElem.Team1Extra,curElem.Team1Wicket)})</h4>
					</div>
					<div className="vs">
						<br/>
						<br/>
						<h5>{curElem.timeDate.split("T")[0]}</h5>
						<h5>{curElem.timeDate.split("T")[1]}</h5>
					</div>
					<div className="sc2">
					<h4>({totalScore(curElem.Team2Score,curElem.Team2Extra,curElem.Team2Wicket)})</h4>
					</div>
					<div className="team2">
						<div className="logo1">
							<img src="./images/team2.jpeg" alt="vs" className="l1"/>
						</div>
						<div className="txt2"><h4>{curElem.team2name}</h4></div>
					</div>
					</div>
					</>
				);
			})}
			</section>
		</>
	);
}
export default PastMatchCard;
