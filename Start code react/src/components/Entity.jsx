import React from "react";

function Entity({ healthPercentage, entityName }) {
  return (
    <section className="container">
      <h2>{entityName} Health</h2>
      <div className="healthbar">
        <div
          className="healthbar__value"
          style={{ width: `${healthPercentage}%` }}
        ></div>
      </div>
    </section>
  );
}

export default Entity;
