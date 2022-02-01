import React from "react";
import ReactDOM from "react-dom";
import Pet from "./pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="Luna" animal="Dog" breed="Havanese" />
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
