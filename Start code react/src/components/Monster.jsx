import React from "react";
import Entity from "./Entity.jsx";

function Monster({ healthPercentage }) {
	return <Entity healthPercentage={healthPercentage} entityName="Monster" />;
}

export default Monster;
