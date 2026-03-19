import React from "react";
import Entity from "./Entity.jsx";

function Player({ healthPercentage }) {
	return <Entity healthPercentage={healthPercentage} entityName="Your" />;
}

export default Player;
