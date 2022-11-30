import React from 'react';
import "./style.css";


const UpcomingMatchCard = (props) =>  {
	// console.log(matchData);
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
			<section className="upcoming main-card--container">
			{matchData.map((curElem) => {
				if(curElem.category !== "upcoming"){
					return(
						<></>
					)
				}
				return(
					<>
				
					<div className="card-container" key={curElem.id}>
				
					<div className="team1">
						<div className="logo1">
							<img src="./images/team1.png" alt="vs" className="l1"/>
						</div>
						<div className="txt1"><h4>{curElem.team1name}</h4></div>
					</div>
					<div className="sc1">
					
					</div>
					<div className="vs">
						<br/>
						<br/>
						<h5>{curElem.timeDate.split("T")[0]}</h5>
						<h5>{curElem.timeDate.split("T")[1]}</h5>
					</div>
					<div className="sc2">
					
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
export default UpcomingMatchCard;
